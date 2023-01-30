import React from 'react';
import {useHistory} from 'react-router-dom';
import CardWrapper from '../../common/Card';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getCurrentUserId} from '../../../store/users';

const UserCard = ({userName, professionName, rate, image, userId}) => {
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId());
  const handleEdit = () => history.push(history.location.pathname + '/edit');

  return (
    <CardWrapper>
      <div className='d-flex flex-column align-items-center text-center position-relative'>
        <img
          src={image}
          className='rounded-circle shadow-1-strong me-3'
          alt='avatar'
          width='90'
          height='90'
        />
        <div className='mt-3'>
          <h4>{userName}</h4>
          <p className='text-secondary mb-1'>{professionName}</p>
          <div className='text-muted'>
            <i
              className='bi bi-caret-down-fill text-primary'
              role='button'
            ></i>
            <i
              className='bi bi-caret-up text-secondary'
              role='button'
            ></i>
            <span className='ms-2'>{rate}</span>
          </div>
        </div>
      </div>
      {currentUserId === userId && (
        <button
          className='position-absolute top-0 end-0 btn btn-light btn-sm'
          onClick={() => handleEdit()}
        >
          <i className='bi bi-gear'></i>
        </button>
      )}
    </CardWrapper>
  );
};

UserCard.propTypes = {
  userName: PropTypes.string,
  professionName: PropTypes.string,
  rate: PropTypes.number,
  image: PropTypes.string,
  userId: PropTypes.string
};

export default UserCard;
