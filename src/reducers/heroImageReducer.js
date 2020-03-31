
import { FETCH_POPULAR_MOVIES } from '../actions/types';

export const heroImageReducer = (state = null, action) => {

    if (action.type === FETCH_POPULAR_MOVIES) 
    {
        if (!state 
            && action.payload.data 
            && action.payload.data.results[0]) 
        {
            return { ...action.payload.data.results[0] };
        }
    }

    return state;
};