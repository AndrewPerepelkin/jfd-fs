import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import {useHistory} from 'react-router-dom';
import {validator} from '../../utils/validator';
import {updateUser} from '../../store/users';

const UpdateForm = ({user, professions, qualities}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getDefaultQualities = (data) =>
    data.map((id) => qualities.find((q) => q.value === id));

  const [data, setData] = useState({
    email: user.email,
    name: user.name,
    profession: user.profession,
    sex: user.sex,
    qualities: getDefaultQualities(user.qualities ? user.qualities : [])
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      isEmail: {
        message: 'Введен некорректный адрес электронной почты'
      }
    },
    name: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      min: {
        message: 'Имя должно состоять минимум из 3 символов',
        value: 3
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберете Вашу профессию'
      }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const getQualities = (elements) => elements.map((q) => q.value);

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const {qualities} = data;
    const updatedData = {
      ...user,
      ...data,
      qualities: getQualities(qualities)
    };
    dispatch(updateUser(updatedData));
  };

  const handleCancel = () => {
    history.replace(`/users/${user._id}`);
  };

  return (
    <form onSubmit={handleUpdate}>
      <TextField
        label={'Имя:'}
        name={'name'}
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label={'Электронная почта:'}
        name={'email'}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label='Выберите профессию:'
        name='profession'
        value={data.profession}
        defaultOption='Выберите профессию...'
        onChange={handleChange}
        options={professions}
        error={errors.profession}
      />
      <RadioField
        options={[
          {name: 'Муж', value: 'male'},
          {name: 'Жен', value: 'female'}
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Укажите Ваш пол:'
      />
      <MultiSelectField
        name='qualities'
        options={qualities}
        onChange={handleChange}
        label='Выберите качества:'
        defaultValue={data.qualities}
      />
      <div className='d-flex flex-column align-items-center'>
        <button
          type='submit'
          // disabled={!isValid}
          className='btn btn-primary w-100 mx-auto mb-2'
        >
          Сохранить
        </button>
        <button
          type='button'
          className='btn btn-secondary w-100 mx-auto mb-2'
          onClick={handleCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

UpdateForm.propTypes = {
  user: PropTypes.object,
  professions: PropTypes.array,
  qualities: PropTypes.array
};

export default UpdateForm;
