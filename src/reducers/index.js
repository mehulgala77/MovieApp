
import { combineReducers } from 'redux';

import { popularMoviesReducer } from '../reducers/popularMoviesReducer';
import { searchMoviesReducer } from '../reducers/searchMoviesReducer';
import { heroImageReducer } from '../reducers/heroImageReducer';

export default combineReducers({
    popularMovies: popularMoviesReducer,
    searchMovies: searchMoviesReducer,
    heroImage: heroImageReducer
});