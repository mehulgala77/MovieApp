
import React, { useState } from 'react';
import { 
    POPULAR_BASE_URL,
    SEARCH_BASE_URL,
    IMAGE_BASE_URL, 
    BACKDROP_SIZE, 
    POSTER_SIZE 
} from '../config';

import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreBtn from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';

import { useHomeFetch } from '../hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const Home = () => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const [ 
        {
            // Note: This is multi level destructuring.
            state : {heroImage, currentPage, totalPages, movies}, 
            error
        },
        fetchMovies
    ] = useHomeFetch(searchTerm);


    // Callback function when user searches something. 
    const searchMovies = search => {
        const endpoint 
            = search 
                ? `${SEARCH_BASE_URL}${search}` 
                : POPULAR_BASE_URL;

        setSearchTerm(search);

        fetchMovies(endpoint);
    };

    // Callback function when "Load More" is clicked.
    const loadMoreMovies = () => {
        const searchEndPoint = 
            `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;

        const popularEndPoint = 
            `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

        const endPoint = searchTerm ? searchEndPoint : popularEndPoint;

        fetchMovies(endPoint);
    };

    if (error) return <div>Something went wrong...</div>;
    if (!movies[0]) return <Spinner />;

    return (
        <React.Fragment>
            { !searchTerm && (
                <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                        title={heroImage.title}             
                        text={heroImage.overview} 
                />
            )} 

            <SearchBar callback={searchMovies} />

            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {movies.map(movie => {
                    return (
                        <MovieThumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : NoImage
                            }
                            movieId={movie.id}
                        />)
                    }
                )}
            </Grid>
            
            {currentPage < totalPages && (
                <LoadMoreBtn text="Load More" callback={loadMoreMovies}/>
            )}
        </React.Fragment>
    );
}

export default Home;