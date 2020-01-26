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
  //End of turn. Wait for button click to put up blinder
  disableBoard();
  state.turnComplete = true;
}

const updatePlayerBoards = () => {
  renderBoard();
  renderDisplayBoard();
  addPlayPhaseListeners();
}

const changeTurn = () => {
  switchPlayers();
  $('#player-turn-title').text(`${state.playerTurn + 1}'s turn`);
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
  state.hoverSquare = null;
  $('#display-board-container').css('display', 'unset');
  $('#board-title').text("Opponent's board. \n Shoot at it");
  $('#display-board-title').text("Your board. \n Dont shoot at it");
}