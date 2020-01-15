equalSquares = function(square1, square2){
  return square1[0] === square2[0] && square1[1] === square2[1];
}
hasSquare = function(squaresArray, squareToFind){
  if(squaresArray.some(square => equalSquares(square, squareToFind)))
    return true;
  return false;
}
//returns all squares a player has ships on
getPlayerSquares = function(player){
  let playerShips = Object.keys(player);
  let takenSquares = [];
  for(ship of playerShips){
    takenSquares = takenSquares.concat(player[ship]);
  }
  return takenSquares;
}


module.exports = {
  equalSquares,
  hasSquare,
  getPlayerSquares
};