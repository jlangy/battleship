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
