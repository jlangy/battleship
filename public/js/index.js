state = {
  playerTurn: 0,
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

const setBoardPlacementListeners = (event) => {
  const clickedSquare = getSquareFromId(event.target.id);
  const playerBoard = state.playerTurn == 0 ? "p1Board" : "p2Board";
  console.log(state.playerTurn);
  const placed = place(clickedSquare, state[playerBoard]);
  if(placed){
    for(let square of findShipsOccupiedSquares(clickedSquare)){
      let squareId = getIdFromSquare(square);
      $(squareId).addClass("hasShip")
    }
    if(state.selectedShip < 4){
      state.selectedShip += 1;
    } else {
      console.log(state[playerBoard].availableSquares);
      state.playerTurn = (state.playerTurn == 0 ? 1 : 0);
      state.selectedShip = 0;
    }
  }
}

$(document).ready(() => {
  state.p1Board.availableSquares = generateBoard();
  state.p2Board.availableSquares = generateBoard();
  renderBoard();
  $('#board').on('click', setBoardPlacementListeners)
});