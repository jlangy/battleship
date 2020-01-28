state = {
  turns: 0,
  playPhase: null,
  hoverSquare: null,
  turnComplete: false,
  playerTurn: 0,
  currentBoard: "p1Board",
  opponentBoard: "p2Board",
  selectedShip: 0,
  //for orientation 0 = north 1 = east 2 south 3 west
  shipOrientation: 1,
  p1Board: {
    //squares that p1 has hit on p2's board
    hitSquares: [],
    //squares that p1 has missed on p2's board
    missSquares: [],
    ships: {}  //{'destroyer': [[1,1],[1,2]], 'battleship': [[5,3],[5,4],[5,5],[5,6]]}
  },
  p2Board: {
    hitSquares: [],
    missSquares: [],
    ships: {}   //{'destroyer': [[5,1],[5,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]}
  }
}



const endGame = () => {
  const gameEndHTML = `<div id="gameEndForm">
                          <form action="register" method="POST">
                          <h2>Score: </h2> <input type="radio" name="score" value=${state.turns} checked>
                          <input type="text" placeholder="username" name="username">
                          <button type='submit'>Submit</button>
                          </form>
                        </div> `
  $('main').append(gameEndHTML);
}

const setGameMenu = () => {
  $('#start-game-btn').on('click', (event) => {
    clearBoard();
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

$(document).ready(() => {
  $('#end-turn-button').on("click", handleTurnEnd);
  $('#new-turn-button').on("click", () => {
    toggleModal('', false);
  });
  setGameMenu();
});

const handleAITurnEnd = () => {
  if(state.playPhase === 'transition'){
    state.selectedShip = 0;
    placeAIShips();
    beginPlayPhase();
    state.playPhase = "gamePlay";
    updatePlayerBoards();
  } else if(state.playPhase === "gamePlay"){
    playAITurn();
    updatePlayerBoards();
  }
}

const handleTurnEnd = () => {
  if(state.turnComplete){
    state.turnComplete = false;
    if(state.opponentType === "AI"){
      console.log(state.turns);
      state.turns = state.turns + 1;
      console.log(state.turns);
      handleAITurnEnd();
    } else {
      if(state.playPhase === "placePhase"){
        switchPlayers();
        renderBoard();
        addPlacementListeners();
      } else if(state.playPhase === "gamePlay"){
        changeTurn();
      } else if(state.playPhase == "transition"){
        beginPlayPhase();
        state.playPhase = "gamePlay";
        changeTurn();
      }
      toggleModal(`${state.playerTurn + 1}'s turn`, true);
    }
  }
}


