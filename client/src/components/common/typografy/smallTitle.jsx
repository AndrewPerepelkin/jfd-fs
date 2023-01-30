import React from 'react';
import PropTypes from 'prop-types';
const SmallTitle = ({children}) => {
  return (
    <h5 className='card-title'>
      <span>{children}</span>
    </h5>
  );
};
SmallTitle.propTypes = {
  children: PropTypes.node
};
export default SmallTitle;
