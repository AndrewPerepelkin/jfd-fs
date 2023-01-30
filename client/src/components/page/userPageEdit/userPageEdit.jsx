import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import UpdateForm from '../../ui/updateForm';
import {useSelector} from 'react-redux';
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities';
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions';
import {getUserById} from '../../../store/users';

const UserPageEdit = ({userId}) => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(getUserById(userId));

  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
    color: qual.color
  }));

  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  useEffect(() => {
    if (!qualitiesLoading && !professionsLoading && user?._id) {
      setIsLoading(false);
    }
  }, [qualitiesLoading, professionsLoading, user]);

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            {!isLoading && professions.length > 0 ? (
              <>
                <h3 className='text-center mb-4'>
                  Изменение данных пользователя
                </h3>

                <UpdateForm
                  user={user}
                  professions={professionsList}
                  qualities={qualitiesList}
                />
              </>
            ) : (
              <div className='text-center mb-4'>Загрузка...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

UserPageEdit.propTypes = {
  userId: PropTypes.string
};

export default UserPageEdit;
