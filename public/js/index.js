state = {
  playPhase: null,
  hoverSquare: null,
  playerTurn: 0,
  currentBoard: "p1Board",
  opponentBoard: "p2Board",
  selectedShip: 0,
  //for orientation 0 = north 1 = east 2 south 3 west
  shipOrientation: 1,
  //Board with players ships on it. Therefore has to have opponents hits on it
  p1Board: {
    hitSquares: [],
    missSquares: [],
    ships:  {}// {'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [[1,1],[1,2], [3,3]],
    missSquares: [],
    ships: {}//{'destroyer': [[1,1],[1,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}

const colorSquare = (square, cssClass) => {
  const squareId = getIdFromSquare(square);
  $(squareId).addClass(cssClass);
}

const shootSquare = function(square){
  if(hasSquare(state[state.currentBoard].hitSquares, square) || hasSquare(state[state.currentBoard].missSquares, square)){
    alert('Already shot!');
    return;
  }
  const opponentBoardKey = state.opponentBoard;
  const opponentShipSquares = getPlayerSquares(state[opponentBoardKey].ships);
  if(hasSquare(opponentShipSquares, square)){
    state[opponentBoardKey].hitSquares.push(square);
    colorSquare(square, 'hitSquare');
    // checkSunk(opponentBoardKey);
  } else {
    state[opponentBoardKey].missSquares.push(square);
    colorSquare(square, 'missSquare');
  }   
}

const addPlayPhaseListeners = () => {
  $('#board').on('click', shootSquareHandler);
}

const shootSquareHandler = (event) => {
  const clickedSquare = getSquareFromId(event.target.id);
  shootSquare(clickedSquare);

}

const beginPlayPhase = () => {
  state.playPhase = "gamePlay"
  renderBoard();
  renderDisplayBoard();
  $('#board').off();
  //You are currently here
  addPlayPhaseListeners();
}

$(document).ready(() => {
  state.p1Board.availableSquares = generateBoard();
  state.p2Board.availableSquares = generateBoard();
  renderBoard();
  addPlacementListeners();
});