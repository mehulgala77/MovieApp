
import { FETCH_POPULAR_MOVIES } from '../actions/types';

const INITIAL_STATE = {
    movies: [],
    error: false,
    currentPage: undefined,
    totalPages: undefined
};

export const popularMoviesReducer = (state = INITIAL_STATE, action) => {

    if(action.type === FETCH_POPULAR_MOVIES) {

        const data = {};
        if (action.payload.data) {

            const movies = action.payload.isLoadMoreRequest
                            ? [...state.movies, ...action.payload.data.results]
                            : [...action.payload.data.results]

            data.movies = movies;
            data.currentPage = action.payload.data.page;
            data.totalPages = action.payload.data.total_pages;
        }

        return { 
            ...state,  
            error: action.payload.error,
            ...data
        };
    }

    return state;
};