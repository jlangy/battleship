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
  // changeTurn();
  disableBoard();
  // toggleModal(`${state.playerTurn}'s turn`, true);
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
  addPlayPhaseListeners();
}

const changeTurn = () => {
  changeTurnState();
  $('#player-turn-title').text(`${state.playerTurn + 1}'s turn`);
  // toggleModal(`${state.playerTurn + 1}'s turn`, true);
  updatePlayerBoards();
  console.log(state.opponentBoard, "opponents board");
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
  $('#board').off();
  $('#display-board-container').css('display', 'unset');
  $('#player-turn-title').text(`${state.playerTurn + 1}'s turn`);
  // renderBoard();
  // renderDisplayBoard();
  $('#board-title').text("Opponent's board. \n Shoot at it");
  $('#display-board-title').text("Your board. \n Dont shoot at it");
  addPlayPhaseListeners();
}