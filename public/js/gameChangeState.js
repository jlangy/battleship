const endGame = () => {
  //TODO: stop gameEndHTML re-rendering when hitting back button
  const gameEndHTML = `<div id="gameEndForm">
                        <form action="register" method="POST">
                          <h2>Score: ${state.turns} </h2> 
                          <input type="radio" name="score" value=${state.turns} checked>
                          <input type="text" placeholder="username" name="username" maxlength="10" required>
                          <button type='submit'>Submit</button>
                        </form>
                      </div>`;
  if(state.opponentType === 'AI' && Object.keys(state.p1Board.ships).length === 0){
    alert('You lost to the AI! Oh dear');
  } else {
    $('main').append(gameEndHTML);
  }
  $('#board').off();
  $('#end-turn-button').off();

}

//add click listeners for new game, cnd setting opponent type
const setGameMenu = () => {
  $('#start-game-btn').on('click', (event) => {
    $('#end-turn-button').on("click", handleTurnEnd);
    $('#new-turn-button').on("click", () => {
      toggleModal('', false);
    });
    clearBoard();
    $('#ships').empty();
    $('#player-turn-title').text('');
    $('#dialogue-box').empty();
    resetState();
    state.opponentType = $('.selected').attr('data-opponent');
    $('#game-display').css('display', 'flex');
    state.playPhase = "placePhase";
    beginPlacementPhase();
  });
  $('#human-opponent, #AI-opponent').on('click', () => {
    $('#human-opponent').toggleClass('selected');
    $('#AI-opponent').toggleClass('selected');
  });
}

const handleAITurnEnd = () => {
  if(state.playPhase === 'transition'){
    state.selectedShip = 0;
    placeAIShips();
    beginPlayPhase();
    state.playPhase = "gamePlay";
    updatePlayerBoards();
    renderShips(state.p1Board.ships);
  } else if(state.playPhase === "gamePlay"){
    switchPlayers();
    playAITurn();
    switchPlayers();
    updatePlayerBoards();
    renderShips(state.p1Board.ships);
  }
}

//Checks three phases,
//transition is used for switching from placement to gameplay round
const handleTurnEnd = () => {
  //do nothing if turn is ongoing
  if(state.turnComplete){
    state.turnComplete = false;
    state.hoverSquare = null;
    $('#ships').empty();

    if(state.opponentType === "AI"){
      state.turns = state.turns + 1;
      handleAITurnEnd();
    } 
    
    else {
      if(state.playPhase === "placePhase"){
        switchPlayers();
        $('#board-title').text(`Player ${state.playerTurn + 1} place ships`)
        renderBoard($('#board'));
        addPlacementListeners();
      } else if(state.playPhase === "gamePlay"){
        changeTurn();
        renderShips(state[state.currentBoard].ships);
      } else if(state.playPhase == "transition"){
        beginPlayPhase();
        state.playPhase = "gamePlay";
        changeTurn();
        renderShips(state[state.currentBoard].ships);
      }
      toggleModal(`${state.playerTurn + 1}'s turn`, true);
    }
  }
}
