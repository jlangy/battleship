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
const getSquareFromId = idStr => idStr ? [Number(idStr[0]), Number(idStr[1])] : false;

const getIdFromSquare = square => "#" + String(square[0]) + String(square[1]);

const switchPlayers = () => {
  const tempPlayerBoard = state.currentBoard;
  state.selectedShip = 0;
  state.currentBoard = state.opponentBoard;
  state.opponentBoard = tempPlayerBoard;
  state.playerTurn = Number(!state.playerTurn);
}

resetState = () => {
  state = state = {
    playPhase: null,
    hoverSquare: null,
    turnComplete: false,
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
}

const generateRandomString = (numOfDigits) => {
  const alphaNums = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890'.split('');
  let randomNum = '';
  for (let i = 0; i < numOfDigits; i++) {
    const randomIndex = Math.floor(Math.random() * 62);
    randomNum += alphaNums[randomIndex];
  }
  return randomNum;
};

pickRandomSquare = () => {
  const xCoord = Math.floor(Math.random() * 10);
  const yCoord = Math.floor(Math.random() * 10);
  return [xCoord, yCoord];
}

pickRandomOrientation = () => Math.floor(Math.random() * 4);
