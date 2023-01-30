import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const handleChange = ({target}) => {
    onChange({name: target.name, value: target.value});
  };

  const getSelectClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : ' mb-4');
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          _id: options[optionName]._id
        }))
      : options;

  return (
    <>
      <label
        htmlFor={name}
        className='form-label'
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className={getSelectClasses()}
        value={value}
        onChange={handleChange}
      >
        <option
          disabled
          value=''
        >
          {defaultOption}
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className='invalid-feedback mb-4'>{error}</div>}
    </>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string
};

export default SelectField;
