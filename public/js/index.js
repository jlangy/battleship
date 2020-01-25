state = {
  playPhase: "gamePlay",
  hoverSquare: null,
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
  alert(`Player ${state.playerTurn + 1} Has Won the game!`);
}

$(document).ready(() => {
  beginPlacementPhase();
});