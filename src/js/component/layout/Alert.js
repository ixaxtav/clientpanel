import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Alert = (props) => {
    const { message, messageType } = props;
    return (
        <div className = {classnames('alert', {
            'alert-succcess': messageType === 'succcess',
            'alert-danger': messageType === 'error'
        })}>
            {message}
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string
};

export default Alert;
