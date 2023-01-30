import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '../common/form/textField';
import {validator} from '../../utils/validator';
import CheckBoxField from '../common/form/CheckBoxField';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthError, login} from '../../store/users';

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError());
  const [data, setData] = useState({email: '', password: '', stayOn: false});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/';
    dispatch(login({payload: data, redirect}));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      isEmail: {
        message: 'Введен некорректный адрес электронной почты'
      }
    },
    password: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      containsCapitalCharacter: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      containsDigit: {
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={'Электронная почта'}
        name={'email'}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label={'Пароль'}
        type={'password'}
        name={'password'}
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
      >
        Оставаться в системе
      </CheckBoxField>
      {authError && <p className='text-danger'>{authError}</p>}
      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary w-100 mx-auto mb-2'
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
