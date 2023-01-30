import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getDataLoadingStatus, loadUsersList} from '../../../store/users';

const UsersLoader = ({children}) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataLoadingStatus());

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (!dataStatus) return 'Загрузка...';
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
