import React, {useState} from 'react'; 
import Spinner from './Spinner';
import PropTypes from 'prop-types';

import { StyledLoadMoreBtn } from '../styles/StyledLoadMoreBtn';

const LoadMoreBtn = ({text, callback}) => {

    const [loading, setLoading] = useState(false);

    const onLoadMoreClicked = () => {
        setLoading(true);
        callback();
        setLoading(false);
    };

    return (
        <React.Fragment>
            {loading && <Spinner/>}
            {!loading && (
                <StyledLoadMoreBtn type="button" onClick={onLoadMoreClicked}>
                    {text}
                </StyledLoadMoreBtn> 
            )}
        </React.Fragment>
    );
};

LoadMoreBtn.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
};

export default LoadMoreBtn;