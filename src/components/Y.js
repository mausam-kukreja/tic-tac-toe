import React from 'react';
import PropTypes from 'prop-types';

const Y = (props) => {
  return (
    <div className="xo" onClick={() => props.makeYourMove(props.turn)}>
    </div>
  );
};

Y.propTypes = {
  makeYourMove: PropTypes.func.isRequired
};

export default Y;
