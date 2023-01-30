import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import {useDispatch, useSelector} from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities';

const QualitiesList = ({qualities}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = qualities
    ? useSelector(getQualitiesByIds(qualities))
    : [];
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  if (isLoading) return <span>загрузка...</span>;

  return (
    <>
      {qualitiesList.map((q) => (
        <Quality
          key={q._id}
          color={q.color}
          name={q.name}
        />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
