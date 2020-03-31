
import { FETCH_SEARCH_MOVIES } from '../actions/types';

const INITAIL_STATE = {
    movies: [],
    error: false,
    currentPage: undefined,
    totalPages: undefined
}

export const searchMoviesReducer = (state = INITAIL_STATE, action) => {

    if (action.type === FETCH_SEARCH_MOVIES) 
    {
        const data = {};

        if (action.payload.data) 
        {
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
            searchTerm: action.payload.searchTerm,
            ...data
        }
    }

    return state;
};