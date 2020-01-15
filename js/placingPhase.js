const helpers = require('../js/index').helpers;
const generateBoard = require('../js/index').generateBoard;
const boardObj = require('../js/index').board;

console.log(helpers);

const placingPhase = {
  selectedShip: 'submarine',
  //0 north, 1 east, etc.
  shipOrientation: 0,
  shipLengths: {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  },
  isPlacable: function(square){
    const occupiedSquares = state.findShipsOccupiedSquares(square);
    return occupiedSquares.every(square => helpers.hasSquare(board, square));
  },
  place: function(square){
    if(this.isPlacable(square)){
      const currentPlayer = state.currentPlayer;
      const shipName = this.selectedShip;
      const shipSquares = state.findShipsOccupiedSquares(square);
      state.board.ships[currentPlayer][shipName] = shipSquares;
      for(shipSquare of shipSquares){
        board = board.filter(boardSquare => !helpers.equalSquares(boardSquare, shipSquare));
      }
    } // TODO: Else logic
  }, 
  findShipsOccupiedSquares: function(clickedSquare){
    const occupiedSquares = [clickedSquare];
    for(let i = 1; i < this.shipLengths[this.selectedShip]; i++){
      if(this.shipOrientation == 0)
        occupiedSquares.push([clickedSquare[0] - i, clickedSquare[1]])
      if(this.shipOrientation == 1)
        occupiedSquares.push([clickedSquare[0], clickedSquare[1] + i]);
      if(this.shipOrientation == 2)
        occupiedSquares.push([clickedSquare[0] + i, clickedSquare[1]]);
      if(this.shipOrientation == 3)
        occupiedSquares.push([clickedSquare[0], clickedSquare[1] - i]);
    } return occupiedSquares;
  }
}

generateBoard();
helpers.printBoard(boardObj.ships['p1']);