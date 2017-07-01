export const initialState = {
  board: {
    0: ['', '', ''],
    1: ['', '', ''],
    2: ['', '', '']
  },
  won: undefined,
  draw: false,
  turn: 'o'
};
const XOInRow = (xo, row) => row.filter(el => el === xo).length;
const XOInColumn = (xo, colNumber, ...rows) => rows.map(row => row[colNumber]).filter(el => el === xo).length;
const XOInLeftSlide = (xo, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[0], row1[1], row2[2]].filter(el => el === xo).length;
};
const XOInRightSlide = (xo, ...rows) => {
  const [row0, row1, row2] = rows;
  return [row0[2], row1[1], row2[0]].filter(el => el === xo).length;
};
const hasRowCleared = (xo, row) => XOInRow(xo, row) === 3;
const hasColumnCleared = (xo, colNumber, ...rows) => XOInColumn(xo, colNumber, ...rows) === 3;
const hasLeftSlideCleared = (xo, ...rows) => XOInLeftSlide(xo, ...rows) === 3;
const hasRightSlideCleared = (xo, ...rows) => XOInRightSlide(xo, ...rows) === 3;
const calculateWinner = (xo, board) => {
  const rows = Object.keys(board).map(row => board[row]);
  return [
    { won: hasRowCleared(xo, board[0])},
    { won: hasRowCleared(xo, board[1])},
    { won: hasRowCleared(xo, board[2])},
    { won: hasColumnCleared(xo, 0, ...rows)},
    { won: hasColumnCleared(xo, 1, ...rows)},
    { won: hasColumnCleared(xo, 2, ...rows)},
    { won: hasLeftSlideCleared(xo, ...rows)},
    { won: hasRightSlideCleared(xo, ...rows)}
  ]
  .reduce((answer, nextCheck) => {
    return nextCheck.won ? nextCheck : answer;
  }, {won: false});
};
export const rootReducer = (state, action) => {
  switch (action.type) {
    case 'MARK_MOVE':
      const {xo, row, columnValue} = action;
      const nextState = {...state};
      nextState.board[row][columnValue] = xo;
      const xResult = calculateWinner('x', nextState.board);
      const oResult = calculateWinner('o', nextState.board);
      if (xResult.won) {
        nextState.won = 'x';
      }
      if (oResult.won) {
        nextState.won = 'o';
      }
      if (!nextState.won) {
        nextState.turn = nextState.turn === 'o' ? 'x' : 'o';
      }
      const boardIsFull = [
        ...nextState.board[0],
        ...nextState.board[1],
        ...nextState.board[2]
      ]
        .filter(xo => xo !== '')
        .length === 9;

      if (boardIsFull && !nextState.won) {
        nextState.draw = true;
      }
      return nextState;
    default:
      return state;
  }
};