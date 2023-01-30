import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import ContainerWrapper from '../../common/container';
import UserCard from './userCard';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';
import Comments from './comments/comments';
import {CommentsProvider} from '../../../hooks/useComments';
import {getUserById} from '../../../store/users';

const UserPage = ({id}) => {
  const user = useSelector(getUserById(id));
  return (
    <ContainerWrapper>
      <div className='row gutters-sm'>
        {user ? (
          <>
            <div className='col-md-4 mb-3'>
              <UserCard
                userName={user.name}
                professionName={user.profession.name}
                rate={user.rate}
                image={user.image}
                userId={user._id}
              />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>
            <div className='col-md-8'>
              <CommentsProvider>
                <Comments />
              </CommentsProvider>
            </div>
          </>
        ) : (
          <div className='m-3'>Loading...</div>
        )}
      </div>
    </ContainerWrapper>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
