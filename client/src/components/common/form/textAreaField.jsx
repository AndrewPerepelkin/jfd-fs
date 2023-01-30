import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({label, name, value, rowsSize, onChange, error}) => {
  const handleChange = ({target}) => {
    if (onChange) {
      onChange({name: target.id, value: target.value});
    }
  };
  return (
    <>
      <label
        htmlFor={name}
        className='form-label'
      >
        {label}
      </label>
      <textarea
        className='form-control'
        id={name}
        rows={rowsSize}
        value={value}
        onChange={handleChange}
      ></textarea>
      {error && <div className='invalid-feedback'>{error}</div>}
    </>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rowsSize: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaField;
