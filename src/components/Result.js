import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Result extends Component {
  render () {
    let result = ''; 
    if (this.props.turn) {
      result = "Please Put a "+this.props.turn;
    }
    if (this.props.won || this.props.draw) {
      result = 'Game Over !!!!';
    }
    return (
      <div>
        <p>
          {result}
        </p>
      </div>
    );
  }
}

Result.propTypes = {
  won: PropTypes.string,
  turn: PropTypes.string.isRequired,
  draw: PropTypes.bool.isRequired
};

export default connect(
  ({won, turn, draw}) => ({
    won, turn, draw
  })
)(Result);