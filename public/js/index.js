state = {
  p1Turn: true,
  p2Turn: false,
  selectedShip: 'destroyer',
  //for orientation 0 = north 1 = east 2 south 3 west
  shipOrientation: 0,
  //Board with players ships on it. Therefore has to have opponents hits on it
  p1Board: {
    hitSquares: [],
    missSquares: [],
    ships:  {}// {'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [[1,1],[1,2], [3,3]],
    missSquares: [],
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}

const setBoardPlacementListeners = (event) => {
  const clickedSquare = getSquareFromId(event.target.id);
  place(clickedSquare, state.p1Board);
  console.log(state.p1Board.ships)
}

$(document).ready(() => {
  state.p1Board.availableSquares = generateBoard();
  state.p2Board.availableSquares = generateBoard();
  renderBoard();
  $('#board').on('click', setBoardPlacementListeners)
});