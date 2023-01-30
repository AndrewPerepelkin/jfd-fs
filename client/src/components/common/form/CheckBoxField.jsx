import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({children, name, value, onChange, error}) => {
  const handleChange = () => {
    onChange({name, value: !value});
  };

  const getClasses = () => {
    return 'form-check-label' + (error ? ' is-invalid' : '');
  };

  return (
    <div className='form-check mb-4'>
      <input
        className='form-check-input'
        type='checkbox'
        checked={value}
        id={name}
        onChange={handleChange}
      />
      <label
        className={getClasses()}
        htmlFor={name}
      >
        {children}
      </label>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

CheckBoxField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default CheckBoxField;
