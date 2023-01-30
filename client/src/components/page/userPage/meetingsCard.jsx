import React from 'react';
import CardWrapper from '../../common/Card';
import SmallTitle from '../../common/typografy/smallTitle';
import PropTypes from 'prop-types';

const MeetingsCard = ({completedMeetings}) => {
  return (
    <CardWrapper extraСardBodyStyle='d-flex flex-column justify-content-center text-center'>
      <SmallTitle>Completed meetings</SmallTitle>
      <h1 className='display-1'>{completedMeetings}</h1>
    </CardWrapper>
  );
};

MeetingsCard.propTypes = {
  completedMeetings: PropTypes.number
};

export default MeetingsCard;
