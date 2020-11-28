
import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../config';
 
export const useMovieFetch = (movieId) => {

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Note: useCallback is the memoized callback function.
    // It will be dependent on "MovieId" because we want to run this function for every movie id.
    const fetchMovie = useCallback(async () => {
        setError(false);
        setLoading(true);

        try
        {
            const movieEndpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const movieResponseRaw = await fetch(movieEndpoint);
            const movieResponse = await movieResponseRaw.json();

            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditsResponseRaw = await fetch(creditsEndpoint);
            const creditResponse = await creditsResponseRaw.json();

            const directors = creditResponse.crew.filter(
                crew => crew.job === 'Director'
            );

            setMovie({
                ...movieResponse,
                actors: creditResponse.cast,
                directors
            });

        } catch (error) {
            setError(true);
            console.error(error);
        }

        setLoading(false);

    }, [movieId]);

    // It will be dependent on "fetchMovie" because whenever movie id changes, this function changes.
    useEffect(() => {

        if(localStorage[movieId]) {
            setMovie(JSON.parse(localStorage[movieId]));
            setLoading(false);
        }
        else {
            fetchMovie();
        }

    }, [fetchMovie, movieId]);

    // Store move in local storage.
    useEffect(() => {

        localStorage.setItem(movieId, JSON.stringify(movie));  

    }, [movieId, movie]);

    return [ {movie, loading, error} ];
};