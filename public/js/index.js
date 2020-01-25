state = {
  playPhase: "gamePlay",
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
    ships: {'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [],
    missSquares: [],
    ships: {'destroyer': [[5,1],[5,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}

const checkSunk = function(){
  //go through hit squares in player board
  const hitSquares = state[state.currentBoard].hitSquares;
  const opponentShips = state[state.opponentBoard].ships;
  const opponentShipKeys = Object.keys(opponentShips);
  for(shipKey of opponentShipKeys){
    if(opponentShips[shipKey].every(square => hasSquare(hitSquares, square))){
      delete opponentShips[shipKey];
      if (Object.keys(opponentShips).length === 0){
        endGame()
      }
    }
  }
}

const endGame = () => {
  alert(`Player ${state.playerTurn + 1} Has Won the game!`);
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
  const opponentShipSquares = getPlayerSquares(state[state.opponentBoard].ships);
  const currentBoard = state.currentBoard;
  if(hasSquare(opponentShipSquares, square)){
    state[currentBoard].hitSquares.push(square);
    colorSquare(square, 'hitSquare');
    checkSunk();
  } else {
    state[currentBoard].missSquares.push(square);
    colorSquare(square, 'missSquare');
  }
  changeTurn();
}

const changeTurnState = () => {
  state.playerTurn = Number(!state.playerTurn);
  const tempCurrentBoard = state.opponentBoard;
  state.opponentBoard = state.currentBoard;
  state.currentBoard = tempCurrentBoard;
}

const updatePlayerBoards = () => {
  $('#displayBoard').empty();
  $('#board').empty();
  renderBoard();
  renderDisplayBoard();
}

const changeTurn = () => {
  changeTurnState();
  alert(`${state.playerTurn + 1}'s Turn`);
  updatePlayerBoards();
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
  //temporary if else for testing. Else statement is placement phase
  if(state.playPhase === "gamePlay"){
    beginPlayPhase();
  } else {
    state.p1Board.availableSquares = generateBoard();
    state.p2Board.availableSquares = generateBoard();
    renderBoard();
    addPlacementListeners();
  }
});