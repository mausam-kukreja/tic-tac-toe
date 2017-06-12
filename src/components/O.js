import React from 'react';
import PropTypes from 'prop-types';

const O = (props) => {
  return (
    <div className='xo'>
      O
    </div>
  );
};

O.propTypes = {
  columnValue: PropTypes.number.isRequired
};

export default O;
