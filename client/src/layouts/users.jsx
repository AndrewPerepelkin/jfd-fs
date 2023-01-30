import React from 'react';
import {Redirect, useParams} from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserPageEdit from '../components/page/userPageEdit';
import {useSelector} from 'react-redux';
import {getCurrentUserId} from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
  const {userId, edit} = useParams();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserPageEdit userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  );
};

export default Users;
