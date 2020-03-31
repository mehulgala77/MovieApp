
import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../config';

// Note: This file is now not used in production Since Home component is now using Redux to 
// manage state. However, keeping this file as reference for how state to be managed using
// hooks.

export const useHomeFetch = (searchTerm) => {
    // States
    const [state, setState] = useState({ movies: [] });
    const [error, setError] = useState(false);

    // Fetch Resource
    const fetchMovies = async endpoint => {
        setError(false)

        // Note: This is to know whether this is coming from load more request.
        const isLoadMoreRequest = endpoint.search('page');

        try {
            const rawResponse = await fetch(endpoint);
            const response = await rawResponse.json();

            setState(prevState => {
                return {
                    ...prevState,
                    movies: isLoadMoreRequest !== -1
                                ? [...prevState.movies, ...response.results]
                                : [...response.results],
                    heroImage: prevState.heroImage || response.results[0],
                    currentPage: response.page,
                    totalPages: response.total_pages
                };
            });

        } catch (error) {
            setError(true);
            console.error(error);
        }
    };

    // To load movies when the Home page loads.
    useEffect(() => {

        if (sessionStorage.homeState) {
            setState(JSON.parse(sessionStorage.homeState));
        }
        else {
            fetchMovies(`${POPULAR_BASE_URL}`)
        }

    }, []);

    // Note: Setting new List of Home page movies in the session storage whenever it is changed.
    // Note: The reason why we are storing this in session storage is because popular movies
    // will keep on changing over time.
    useEffect(() => {

        if(!searchTerm) {
            sessionStorage.setItem('homeState', JSON.stringify(state));
        }

    }, [searchTerm, state]);

    return [ {state, error}, fetchMovies ];
};