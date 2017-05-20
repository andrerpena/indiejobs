import React from 'react';
import PropTypes from 'prop-types';

const TextBox = (field) => {
    const { meta: { invalid, touched } } = field;
    const classes = ['form-control'];
    if (invalid && touched) {
        classes.push('invalid');
    }
    return <input {...field.input} className={classes.join(' ')} type="text" />;
};

TextBox.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};

export default TextBox;