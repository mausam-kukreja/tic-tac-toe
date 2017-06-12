import React, { Component } from 'react';
import Y from './Y';
import X from './X';
import O from './O';
import { makeYourMove } from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Board extends Component {

  makeYourMove (rowValue, columnValue, xo) {
    !this.props.won && this.props.makeYourMove(rowValue, columnValue, xo);
  }

  getXO(rowValue, columnValue, xo) {
    if (xo === 'x') {
      return <X key={columnValue} columnValue={columnValue} />;
    }
    if (xo === 'o') {
      return <O key={columnValue} columnValue={columnValue} />;
    }
    return <Y key={columnValue} makeYourMove={this.makeYourMove.bind(this, rowValue, columnValue)} turn={this.props.turn} />;
  }

  render() {
    return (
      <div className='board'>
        {
          Object.keys(this.props.board)
            .map(rowValue => {
              return (
                <div className='row' key={rowValue}>
                  {
                    this.props.board[rowValue].map((xo, columnValue) => {
                      return this.getXO(rowValue, columnValue, xo);
                    })
                  }
                </div>
              );
            })
        }
      </div>
    );
  }
}
Board.propTypes = {
  board: PropTypes.object.isRequired,
  turn: PropTypes.string.isRequired,
  won: PropTypes.string,
  draw: PropTypes.bool.isRequired,
  makeYourMove: PropTypes.func.isRequired
};
export default connect(
  ({board, turn, won, draw}) => ({
    board, turn, won, draw
  }),
  (dispatch) => {
    return {
      makeYourMove (rowValue, columnValue, xo) {
        dispatch(makeYourMove(rowValue, columnValue, xo));
      }
    };
  }
)(Board);