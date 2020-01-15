const hasSquare = require('../js/helpers').hasSquare;
const equalSquares = require('../js/helpers').equalSquares;


shipLengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}

const isPlacable = function(square, board){
  const occupiedSquares = findShipsOccupiedSquares(square);
  return occupiedSquares.every(square => hasSquare(board, square));
}

const place = function(square, board){
  if(isPlacable(square, board)){
    const currentPlayer = state.currentPlayer;
    const shipName = state.selectedShip;
    const shipSquares = findShipsOccupiedSquares(square);
    const currentBoard = state.p1Turn ? "p1Board" : "p2Board";
    state[currentBoard]["ships"][shipName] = shipSquares;
    for(shipSquare of shipSquares){
      board = board.filter(boardSquare => !equalSquares(boardSquare, shipSquare));
    }
  } // TODO: Else logic
}
const findShipsOccupiedSquares = function(clickedSquare){
  const occupiedSquares = [clickedSquare];
  for(let i = 1; i < shipLengths[state.selectedShip]; i++){
    if(state.shipOrientation == 0)
      occupiedSquares.push([clickedSquare[0] - i, clickedSquare[1]])
    if(state.shipOrientation == 1)
      occupiedSquares.push([clickedSquare[0], clickedSquare[1] + i]);
    if(state.shipOrientation == 2)
      occupiedSquares.push([clickedSquare[0] + i, clickedSquare[1]]);
    if(state.shipOrientation == 3)
      occupiedSquares.push([clickedSquare[0], clickedSquare[1] - i]);
  } return occupiedSquares;
}

module.exports = {
  shipLengths,
  isPlacable,
  place,
  findShipsOccupiedSquares
}