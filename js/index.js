const generateBoard = require('./board').generateBoard;
const printBoard = require('./board').printBoard;
const place = require('./placingPhase').place;
const isPlacable = require('./placingPhase').isPlacable;
const hasSquare = require('./helpers').hasSquare;
const equalSquares = require('./helpers').equalSquares;
const findShipsOccupiedSquares = require('./placingPhase').findShipsOccupiedSquares;
const getPlayerSquares = require('./helpers').getPlayerSquares;

state = {
  p1Turn: false,
  p2Turn: true,
  selectedShip: 'destroyer',
  shipOrientation: 0,
  board: generateBoard(),
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

const shootSquare = function(square){
  const playerBoardKey = state.p1Turn ? "p1Board": "p2Board";
  if(hasSquare(state[playerBoardKey].hitSquares, square) || hasSquare(state[playerBoardKey].missSquares, square)){
    return;
    //Can't reshoot, send some msg here
  }
  const opponentBoardKey = state.p1Turn ? "p2Board" : "p1Board";
  const opponentShipSquares = getPlayerSquares(state[opponentBoardKey].ships);
  //if matches a ship, add to player hits
    //if sunk ship remove ship
  //if miss, add to player misses
}

shootSquare();