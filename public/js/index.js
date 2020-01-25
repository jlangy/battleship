state = {
  playerTurn: 0,
  currentBoard: "p1Board",
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
  const placed = place(clickedSquare, state[state.currentBoard]);
  if(placed){
    renderShipToBoard(clickedSquare);
  }
}

const renderShipToBoard = (clickedSquare) => {
  for(let square of findShipsOccupiedSquares(clickedSquare)){
    let squareId = getIdFromSquare(square);
    $(squareId).addClass("hasShip")
  }
  incrementPlacePhase();
}

const incrementPlacePhase = () => {
  if(state.selectedShip < 4){
    state.selectedShip += 1;
  } else {
    if(state.playerTurn === 0){
      state.playerTurn = 1;
      state.currentBoard = "p2Board";
      state.selectedShip = 0;
    } else {
      beginPlayPhase();
    }
  }
}

$(document).ready(() => {
  state.p1Board.availableSquares = generateBoard();
  state.p2Board.availableSquares = generateBoard();
  renderBoard();
  $('#board').on('click', setBoardPlacementListeners)
});