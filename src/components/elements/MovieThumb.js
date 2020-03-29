
import React from 'react'; 
import PropTypes from 'prop-types';

import { Link } from '@reach/router';

import { StyledMovieThumb } from '../styles/StyledMovieThumb';

const MovieThumb = ({movieId, image, clickable}) => {

    return (
        <StyledMovieThumb>
            {clickable 
                ? (
                    <Link to={`/${movieId}`}>
                        <img className="clickable" src={image} alt="MovieThumb"/>
                    </Link>
                )
                : <img src={image} alt="MovieThumb"/>
            }
        </StyledMovieThumb>
    );
}

MovieThumb.propTypes = {
    movieId: PropTypes.number,
    image: PropTypes.string,
    clickable: PropTypes.bool
};

export default MovieThumb;