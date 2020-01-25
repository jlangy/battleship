const shipLengths = [
  {name: 'carrier', length: 5},
  {name: 'battleship', length: 4},
  {name: 'cruiser', length: 3},
  {name: 'submarine', length: 3},
  {name: 'destroyer', length: 2}
]

const isPlacable = function(square, board){
  const occupiedSquares = findShipsOccupiedSquares(square);
  return occupiedSquares.every(square => hasSquare(board.availableSquares, square));
}

const place = function(square, playerBoard){
  if(isPlacable(square, playerBoard)){
    const shipName = shipLengths[state.selectedShip].name;
    const shipSquares = findShipsOccupiedSquares(square);
    //Not allowing multiple ships currently, so can writeover
    playerBoard.ships[shipName] = shipSquares;
    for(shipSquare of shipSquares){
      playerBoard.availableSquares = playerBoard.availableSquares.filter(boardSquare => !equalSquares(boardSquare, shipSquare));
    }
    return true;
  } else{
    return false
  }
}

//Takes in a square. Returns an array of all squares the selected ship would
//occupy if it were placed on that square in the current orientation
const findShipsOccupiedSquares = function(clickedSquare){
  const occupiedSquares = [clickedSquare];
  for(let i = 1; i < shipLengths[state.selectedShip].length; i++){
    if(state.shipOrientation == 0)
      occupiedSquares.push([clickedSquare[0] - i, clickedSquare[1]])
    if(state.shipOrientation == 1)
      occupiedSquares.push([clickedSquare[0], clickedSquare[1] + i]);
    if(state.shipOrientation == 2)
      occupiedSquares.push([clickedSquare[0] + i, clickedSquare[1]]);
    if(state.shipOrientation == 3)
      occupiedSquares.push([clickedSquare[0], clickedSquare[1] - i]);
  } return occupiedSquares;
}

//Change the orientation of the ship being placed
//Remove old hover css classes, and add new ones for current orientation 
const changeOrientation = (event) => {
  const currentSquare = getSquareFromId(state.hoverSquare.id);
  removePlacableCSS();
  switch (event.key){
    case "ArrowUp":
      state.shipOrientation = 0;
      break;
    case "ArrowRight":
      state.shipOrientation = 1;
      break;
    case "ArrowDown":
      state.shipOrientation = 2;
      break;
    case "ArrowLeft":
      state.shipOrientation = 3;
      break;
  }
  addPlacableCSS(currentSquare);
}

//Handles ship being placed, checks for turn change
//or game start.
const incrementPlacePhase = () => {
  if(state.selectedShip < 4){
    state.selectedShip += 1;
  } else {
    if(state.playerTurn === 0){
      state.playerTurn = 1;
      state.currentBoard = "p2Board";
      state.opponentBoard = "p1Board";
      state.selectedShip = 0;
      alert("PLayer 2 turn");
      renderBoard();
      addPlacementListeners();
    } else {
      alert('Begin!');
      state.playPhase = 'gamePlay';
      state.playerTurn = 0;
      beginPlayPhase();
    }
  }
}

         
const addPlacementListeners = () => {
  $('#board').on('click', placeShip);
  $('#board').children().mouseover(setHover);
  $('#board').children().mouseout(removePlacableCSS);
  $('body').keydown(changeOrientation);
}

const placeShip = (event) => {
  const clickedSquare = getSquareFromId(event.target.id);
  const placed = place(clickedSquare, state[state.currentBoard]);
  if(placed){
    renderShipToBoard(clickedSquare);
  }
}

//set the css for current square hover
const setHover = event => {
  state.hoverSquare = event.target;
  const clickedSquare = getSquareFromId(event.target.id);
  addPlacableCSS(clickedSquare);
}

const addPlacableCSS = (clickedSquare) => {
  const possibleSquares = findShipsOccupiedSquares(clickedSquare);
  const placable = isPlacable(clickedSquare, state[state.currentBoard]);
  if(placable){
    for(let square of possibleSquares){
      let squareId = getIdFromSquare(square);
      $(squareId).addClass("placable");
    }
  } else {
    for(let square of possibleSquares){
      let squareId = getIdFromSquare(square);
      $(squareId).addClass("notPlacable");
    }
  }
}

const beginPlacementPhase = () => {
  state.p1Board.availableSquares = generateBoard();
  state.p2Board.availableSquares = generateBoard();
  renderBoard();
  $('#board-title').text('Place Ships Here');
  addPlacementListeners();
}

const removePlacableCSS = () => {
  const clickedSquare = getSquareFromId(state.hoverSquare.id);
  const possibleSquares = findShipsOccupiedSquares(clickedSquare);
  for(let square of possibleSquares){
    let squareId = getIdFromSquare(square);
    $(squareId).removeClass("placable");
    $(squareId).removeClass("notPlacable");
  }
}

const renderShipToBoard = (clickedSquare) => {
  for(let square of findShipsOccupiedSquares(clickedSquare)){
    let squareId = getIdFromSquare(square);
    $(squareId).addClass("hasShip");
  }
  incrementPlacePhase();
}
