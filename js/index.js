const generateBoard = require('./board').generateBoard;
const printBoard = require('./board').printBoard;
const place = require('./placingPhase').place;
const isPlacable = require('./placingPhase').isPlacable;
const hasSquare = require('./helpers').hasSquare;
const equalSquares = require('./helpers').equalSquares;
const findShipsOccupiedSquares = require('./placingPhase').findShipsOccupiedSquares;



state = {
  p1Turn: true,
  p2Turn: false,
  selectedShip: 'destroyer',
  shipOrientation: 0,
  p1Board: {
    hitSquares: [],
    missSquares: [],
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [],
    missSquares: [],
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}

const board = generateBoard();

printBoard(state.p1Board.ships);
place([7,7], board);
printBoard(state.p1Board.ships);

