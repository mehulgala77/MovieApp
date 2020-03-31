
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    fetchPopularMovies,
    fetchSearchMovies
 } from '../actions';

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

import NoImage from './images/no_image.jpg';

const Home = ( 
    {   
        fetchPopularMovies, 
        fetchSearchMovies,
        popularMovies, 
        searchMovies,
        heroImage,
        currentPage,
        totalPages,
        searchTerm,
        error 
    } ) => 
{
    useEffect(() => {
        fetchPopularMovies(POPULAR_BASE_URL);
    }, []);

    // Callback function when user searches something. 
    const searchMoviesCallback = searchTerm => {
        const endPoint = `${SEARCH_BASE_URL}${searchTerm}`;
        fetchSearchMovies(endPoint, searchTerm);
    };

    // Callback function when "Load More" is clicked.
    const loadMoreMovies = () => {

        const searchMoviesEndPoint = 
            `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;

        const popularMoviesEndPoint = 
            `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

        if (searchTerm) {
            fetchSearchMovies(searchMoviesEndPoint, searchTerm);
        }
        else {
            fetchPopularMovies(popularMoviesEndPoint);
        }
    };

    const isSearchEnabled = searchTerm ? true : false;
    const movies = isSearchEnabled ? searchMovies : popularMovies;

    if (error) return <div>Something went wrong...</div>;
    if (!movies[0]) return <Spinner />;

    return (
        <React.Fragment>
            { !isSearchEnabled && (
                <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                        title={heroImage.title}             
                        text={heroImage.overview} 
                />
            )} 

            <SearchBar callback={searchMoviesCallback} />

            <Grid header={isSearchEnabled ? 'Search Results' : 'Popular Movies'}>
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

const mapStateToProps = state => {

    const currentPage = state.searchMovies.movies && state.searchMovies.movies.length > 0 
                        ? state.searchMovies.currentPage
                        : state.popularMovies.currentPage;

    const totalPages = state.searchMovies.movies && state.searchMovies.movies.length > 0 
                        ? state.searchMovies.totalPages
                        : state.popularMovies.totalPages;

    return {
        popularMovies: state.popularMovies.movies,
        searchMovies: state.searchMovies.movies,
        error: state.popularMovies.error || state.searchMovies.error,   
        heroImage: state.heroImage,
        currentPage,
        totalPages,
        searchTerm: state.searchMovies.searchTerm
    }
};

export default connect(
    mapStateToProps, 
    { fetchPopularMovies, fetchSearchMovies }
)(Home);