import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const {type} = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    );
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='text-center mb-4'>
            {formType === 'register' ? 'Регистрация' : 'Вход'}
          </h3>
          {formType === 'register' ? (
            <>
              <RegisterForm />
              <div className='d-flex flex-column align-items-center'>
                <p className='mb-1'>У Вас уже есть аккаунт?</p>
                <a
                  role='button'
                  onClick={toggleFormType}
                  className='pl-2'
                >
                  Войти
                </a>
              </div>
            </>
          ) : (
            <>
              <LoginForm />
              <div className='d-flex flex-column align-items-center'>
                <p className='mb-1'>У Вас ещё нет аккаунта?</p>
                <a
                  role='button'
                  onClick={toggleFormType}
                  className='pl-2'
                >
                  Зарегистрироваться
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
