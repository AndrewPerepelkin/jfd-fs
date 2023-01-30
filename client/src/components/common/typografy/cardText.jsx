import React from 'react';
import PropTypes from 'prop-types';
const CardText = ({children}) => {
  return <p className='card-text'>{children}</p>;
};
CardText.propTypes = {
  children: PropTypes.node
};
export default CardText;
