import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentUserData} from '../../store/users';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  if (!currentUser) return 'Загрузка...';

  return (
    <div
      className='dropdown'
      onClick={toggleMenu}
    >
      <div className='btn dropdown-toggle d-flex align-items-center'>
        <div className='me-2'>{currentUser.name}</div>
        <img
          src={currentUser.image}
          className='img-responsive rounded-circle'
          height='40'
          alt='avatar'
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link
          to={`/users/${currentUser._id}`}
          className='dropdown-item'
        >
          Профиль
        </Link>
        <Link
          to='/logout'
          className='dropdown-item'
        >
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
