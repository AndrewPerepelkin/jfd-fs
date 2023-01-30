import React, {useState} from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onInput,
  onFocus,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = ({target}) => {
    if (onChange) {
      onChange({name: target.name, value: target.value});
    }
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className='mb-2'
      >
        {label}
      </label>
      <div className='input-group has-validation'>
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onInput={onInput}
          onFocus={onFocus}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button
            className='btn btn-outline-secondary'
            type='button'
            onMouseDown={toggleShowPassword}
            onMouseUp={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (!showPassword ? '-slash' : '')} />
          </button>
        )}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
