const checkSunk = function(){
  //go through hit squares in player board
  const hitSquares = state[state.currentBoard].hitSquares;
  //if its AI, always use p1board
  const opponentShips = state[state.opponentBoard].ships;
  for(shipKey of Object.keys(opponentShips)){
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
  const currentBoard = state.currentBoard;
  //Do nothing if the square has already been shot
  if(hasSquare(state[currentBoard].hitSquares, square) || hasSquare(state[currentBoard].missSquares, square)){
    return;
  }
  const opponentShipSquares = getPlayerSquares(state[state.opponentBoard].ships);
  if(hasSquare(opponentShipSquares, square)){
    state[currentBoard].hitSquares.push(square);
    colorSquare(square, 'hitSquare');
    updateDialogue(square, 1, `${state.playerTurn ? "P2" : "P1"}`);
    checkSunk();
  } else {
    state[currentBoard].missSquares.push(square);
    colorSquare(square, 'missSquare');
    updateDialogue(square, 0, `${state.playerTurn ? "P2" : "P1"}`);
  }
  //End of turn. Wait for button click to put up blinder
  disableBoard();
  state.turnComplete = true;
}

//shoots random square
const playAITurn = () => {
  let hasntShot = true;
  while(hasntShot){
    const square = pickRandomSquare();
    //makes sure square hasnt been hit/missed already
    if(!hasSquare(state.p2Board.hitSquares, square) && !hasSquare(state.p2Board.missSquares, square)){
      const playerShipSquares = getPlayerSquares(state.p1Board.ships);
      if(hasSquare(playerShipSquares, square)){
        state.p2Board.hitSquares.push(square);
        updateDialogue(square, 1, "AI");
        checkSunk();
      } else {
        state.p2Board.missSquares.push(square);
        updateDialogue(square, 0, "AI");
      }
      hasntShot = false;
    }
  }
}

const updateDialogue = (square, result, player) => {
  const letter = "ABCDEFGHIJ"[square[0]];
  $('#dialogue-box').prepend(`<p>${player} shot ${letter + String(square[1] + 1)} and ${result ? "hit!" : "missed"} </p>`);
}

const updatePlayerBoards = () => {
  renderBoard($('#board'));
  renderBoard($('#displayBoard'));
  addPlayPhaseListeners();
}

const changeTurn = () => {
  switchPlayers();
  $('#player-turn-title').text(`Player ${state.playerTurn + 1}'s turn`);
  updatePlayerBoards();
}

const addPlayPhaseListeners = () => {
  $('#board>.square').on('click', shootSquareHandler);
}

const shootSquareHandler = (event) => {
  const clickedSquare = getSquareFromId(event.target.id);
  if(clickedSquare)
    shootSquare(clickedSquare);
}

const beginPlayPhase = () => {
  state.hoverSquare = null;
  $('#display-board-container').css('display', 'unset');
  $('#board-title').text("Opponent's board");
  $('#display-board-title').text("Your board");
}