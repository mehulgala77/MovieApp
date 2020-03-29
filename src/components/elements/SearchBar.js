
import React, {useState, useRef} from 'react'; 
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import { 
    StyledSearchBar, 
    StyledSearchBarContent 
} from '../styles/StyledSearchBar'; 

const SearchBar = ( { callback } ) => {
    const [state, setState] = useState('');

    // Note: useRed is used to persist immutable values between renders.
    // Here it is used to stop triggering search immediately as user types.
    // The search should kick in after a slight pause. Otherwise we would have two many searches.
    let timeout = useRef(null);

    const doSearch = event => {
        const { value } = event.target;

        clearTimeout(timeout.current);

        setState(value);

        timeout.current = setTimeout(() => {
            callback(value);
        }, 500);
    };

    return (
        <StyledSearchBar>
            <StyledSearchBarContent>
                <FontAwesome 
                    className="fa-search" 
                    name="search"
                    size="2x" 
                />
                <input 
                    type="text"
                    placeholder="Search movie"
                    onChange={doSearch}
                    value={state}
                />
            </StyledSearchBarContent>
        </StyledSearchBar>
    );
}

SearchBar.propTypes = {
    callback: PropTypes.func
}

export default SearchBar;