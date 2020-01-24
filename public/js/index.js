state = {
  p1Turn: false,
  p2Turn: true,
  selectedShip: 'destroyer',
  shipOrientation: 0,
  p1board: generateBoard(),
  p2board: generateBoard(),
  //Board with players ships on it. Therefore has to have opponents hits on it
  p1Board: {
    hitSquares: [],
    missSquares: [],
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [[1,1],[1,2], [3,3]],
    missSquares: [],
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}

const setBoardPlacementListeners = (event) => {
  console.log(event.target.id)
  const clickedSquare = getSquareFromId(event.target.id);
  console.log(clickedSquare);
}

$(document).ready(() => {
  renderBoard();
  $('#board').on('click', setBoardPlacementListeners)
});