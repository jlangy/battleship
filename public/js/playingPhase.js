

const checkSunk = function(playerBoardKey){
  //go through hit squares in player board
  const hitSquares = state[playerBoardKey].hitSquares;
  const playerShips = state[playerBoardKey].ships;
  const playerShipKeys = Object.keys(playerShips);
  for(shipKey of playerShipKeys){
    if(playerShips[shipKey].every(square => hasSquare(hitSquares, square))){
      console.log(`You sunk the ship ${shipKey}`);
      delete playerShips[shipKey];
    }
  }
}