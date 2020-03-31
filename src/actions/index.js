
import { 
    POPULAR_BASE_URL,
    SEARCH_BASE_URL
} from '../config';

import { 
    FETCH_POPULAR_MOVIES,
    FETCH_SEARCH_MOVIES
} from './types';

export const fetchPopularMovies = endPoint => async dispatch => {

    try {

        const isLoadMoreRequest = endPoint.search("page") !== -1 ? true : false;

        let response = null;

        if(isLoadMoreRequest) 
        {
            const rawResponse = await fetch(endPoint);
            response = await rawResponse.json();
        }
        else 
        {
            if (sessionStorage.popularMovies) 
            {
                response = JSON.parse(sessionStorage.popularMovies);
            }
            else 
            {
                const rawResponse = await fetch(endPoint);
                response = await rawResponse.json();
    
                sessionStorage.setItem('popularMovies', JSON.stringify(response));
            }
        }


        dispatch( { 
            type: FETCH_POPULAR_MOVIES,
            payload: { 
                data: response,
                error: false,
                isLoadMoreRequest
            }
        });
    }
    catch(error) {
        console.error(error);

        dispatch( { 
            type: FETCH_POPULAR_MOVIES,
            payload: { 
                data: null,
                error: true,
                isLoadMoreRequest: undefined
            }
        });
    }
};

export const fetchSearchMovies = (endPoint, searchTerm) => async dispatch => {
    
    if (searchTerm) {

        try {
            const rawResponse = await fetch(endPoint);
            const response = await rawResponse.json();

            const isLoadMoreRequest = endPoint.search("page") !== -1 ? true : false;

            dispatch( { 
                type: FETCH_SEARCH_MOVIES,
                payload: { 
                    data: response,
                    error: false,
                    searchTerm,
                    isLoadMoreRequest
                }
            });
        }
        catch (error) {
            console.log(error);

            dispatch( { 
                type: FETCH_SEARCH_MOVIES,
                payload: { 
                    data: null,
                    error: true,
                    searchTerm,
                    isLoadMoreRequest: false
                }
            });
        }
    }
    else {
        dispatch( { 
            type: FETCH_SEARCH_MOVIES,
            payload: { 
                data: null,
                error: false,
                searchTerm: undefined,
                isLoadMoreRequest: false
            }
        });
    }
}