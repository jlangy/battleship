const shootSquare = function(square){
  //Checking if on board should be unneccessary since it will be called via click listener
  const playerBoardKey = state.playerTurn ? "p1Board": "p2Board";
  if(hasSquare(state[playerBoardKey].hitSquares, square) || hasSquare(state[playerBoardKey].missSquares, square)){
    return;
    //Can't reshoot, send some msg here
  }
  const opponentBoardKey = state.playerTurn ? "p2Board" : "p1Board";
  const opponentShipSquares = getPlayerSquares(state[opponentBoardKey].ships);
  if(hasSquare(opponentShipSquares, square)){
    state[opponentBoardKey].hitSquares.push(square);
    // checkSunk(opponentBoardKey);
  } else {
    state[opponentBoardKey].missSquares.push(square);
  }   
}

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