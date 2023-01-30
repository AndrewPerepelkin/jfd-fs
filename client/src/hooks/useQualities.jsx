import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import qualityService from '../services/qualityService';

const QualitiesContext = React.createContext();

export const useQualities = () => useContext(QualitiesContext);

export const QualitiesProvider = ({children}) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQualitiesList = async () => {
    try {
      const {content} = await qualityService.get();
      setQualities(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getQuality = (id) => qualities.find((q) => q._id === id);

  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  };

  return (
    <QualitiesContext.Provider value={{qualities, isLoading, getQuality}}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
