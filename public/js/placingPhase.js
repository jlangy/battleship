shipLengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}

const isPlacable = function(square, board){
  const occupiedSquares = findShipsOccupiedSquares(square);
  return occupiedSquares.every(square => hasSquare(board.availableSquares, square));
}

const place = function(square, playerBoard){
  if(isPlacable(square, playerBoard)){
    const shipName = state.selectedShip;
    const shipSquares = findShipsOccupiedSquares(square);
    playerBoard.ships[shipName] = shipSquares;
    for(shipSquare of shipSquares){
      playerBoard.availableSquares = playerBoard.availableSquares.filter(boardSquare => !equalSquares(boardSquare, shipSquare));
    }
  } else{
    console.log("Couldn't place");
  }// TODO: Else logic
}

//Takes in a square. Returns an array of all squares the selected ship would
//occupy if it were placed on that square in the current orientation
const findShipsOccupiedSquares = function(clickedSquare){
  const occupiedSquares = [clickedSquare];
  for(let i = 1; i < shipLengths[state.selectedShip]; i++){
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
