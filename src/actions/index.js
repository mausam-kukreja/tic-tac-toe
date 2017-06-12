export const makeYourMove = (row, columnValue, xo) => ({
  type: 'MARK_MOVE',
  xo,
  row,
  columnValue
});