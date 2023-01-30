import React, {useState} from 'react';
import {validator} from '../../../../utils/validator';
import TextAreaField from '../../../common/form/textAreaField';
import PropTypes from 'prop-types';

const AddCommentsForm = ({onSubmit}) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData({});
    setErrors({});
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Текст комментария не должен быть пустым'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <h2>Написать комментарий</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          name='content'
          label='Сообщение'
          value={data.content || ''}
          onChange={handleChange}
          rowsSize='3'
          error={errors.content}
        />
        <div className='d-flex justify-content-end'>
          <button
            type='submit'
            className='btn btn-primary mt-2'
          >
            Опубликовать
          </button>
        </div>
      </form>
    </>
  );
};

AddCommentsForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentsForm;
