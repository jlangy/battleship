const equalSquares = function(square1, square2){
  return square1[0] === square2[0] && square1[1] === square2[1];
}
const hasSquare = function(squaresArray, squareToFind){
  if(squaresArray.some(square => equalSquares(square, squareToFind)))
    return true;
  return false;
}
//returns all squares a player has ships on
const getPlayerSquares = function(player){
  let playerShips = Object.keys(player);
  let takenSquares = [];
  for(ship of playerShips){
    takenSquares = takenSquares.concat(player[ship]);
  }
  return takenSquares;
}
//Given an element id, e.g "11", return it as a square, [1,1]
const getSquareFromId = idStr => [Number(idStr[0]), Number(idStr[1])];

console.log(getSquareFromId('55'));
console.log(getSquareFromId('35'));
console.log(getSquareFromId('59'));