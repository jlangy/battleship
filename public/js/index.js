state = {
  isSubmitted: false,
  turns: 0,
  //tracks if placing ships, playing, or switching between the two
  playPhase: null,
  //Used for putting appropriate css on squares during placement
  hoverSquare: null,
  turnComplete: false,
  playerTurn: 0,
  currentBoard: "p1Board",
  opponentBoard: "p2Board",
  //index used for the shipLengths object
  selectedShip: 0,
  //for orientation 0 = north 1 = east 2 south 3 west
  shipOrientation: 1,
  p1Board: {
    //squares that p1 has hit on p2's board
    hitSquares: [],
    //squares that p1 has missed on p2's board
    missSquares: [],
    ships: {}
  },
  p2Board: {
    hitSquares: [],
    missSquares: [],
    ships: {}
  }
}

$(document).ready(() => {
  $('#end-turn-button').on("click", handleTurnEnd);
  $('#new-turn-button').on("click", () => {
    toggleModal('', false);
  });
  setGameMenu();
});


