import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import professionService from '../services/professionService';
import {toast} from 'react-toastify';

const ProfessionContext = React.createContext();

export const useProfession = () => useContext(ProfessionContext);

export const ProfessionProvider = ({children}) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getProfessionsList();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getProfession = (id) => {
    return professions.find((p) => p._id === id);
  };

  const getProfessionsList = async () => {
    try {
      const {content} = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  };

  return (
    <ProfessionContext.Provider value={{professions, isLoading, getProfession}}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
