import React from 'react';

import PropTypes from 'prop-types';
const CardWrapper = ({children, extraСardBodyStyle}) => {
  return (
    <div className='card mb-3'>
      <div
        className={
          'card-body' + (extraСardBodyStyle ? ' ' + extraСardBodyStyle : '')
        }
      >
        {children}
      </div>
    </div>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  extraСardBodyStyle: PropTypes.string
};

export default CardWrapper;
