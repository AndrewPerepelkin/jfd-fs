import React from 'react';
import PropTypes from 'prop-types';
const SearchStatus = ({length}) => {
  const renderPhrase = (n) => {
    if (n === 0) {
      return 'Никто с тобой не тусанет';
    } else if (String(n).endsWith('1')) {
      return n + ' человек тусанет с тобой сегодня';
    } else if (
      (n < 10 || n > 20) &&
      (String(n).endsWith('2') ||
        String(n).endsWith('3') ||
        String(n).endsWith('4'))
    ) {
      return n + ' человека тусанет с тобой сегодня';
    } else {
      return n + ' человек тусанет с тобой сегодня';
    }
  };

  return (
    <h2>
      <span className={length === 0 ? 'badge bg-danger' : 'badge bg-primary'}>
        {renderPhrase(length)}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
