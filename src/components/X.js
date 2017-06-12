import React from 'react';
import PropTypes from 'prop-types';

const X = (props) => {
  return (
    <div className='xo'>
      X
    </div>
  );
};

X.propTypes = {
  columnValue: PropTypes.number.isRequired
};

export default X;