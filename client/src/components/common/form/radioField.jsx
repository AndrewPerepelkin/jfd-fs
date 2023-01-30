import React from 'react';
import PropTypes from 'prop-types';

const RadioField = ({options, name, onChange, value, label}) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value});
  };
  return (
    <div className='mb-4'>
      <div className='mb-2'>
        <label className='form-label'>{label}</label>
      </div>
      {options &&
        options.map((option) => (
          <div
            key={option.value}
            className='form-check form-check-inline'
          >
            <input
              className='form-check-input'
              type='radio'
              name={name}
              id={option.name + '_' + option.value}
              value={option.value}
              onChange={handleChange}
              checked={option.value === value}
            />
            <label
              className='form-check-label'
              htmlFor={option.name + '_' + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

export default RadioField;
