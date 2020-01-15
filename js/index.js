state = {
  // GamePhase: {
  //   StartingGame:
  //     display options (vs AI, difficulty, colour, etc.)
  //   Placing ships:
  //     display ship selector, allow placement etc.
  //   P1 turn:
  //     click on square
  //   P2 turn (possibly AI)
  //     Choose square, play square
  //   Game end:
  //     static display screen, activate start button.
  // }
  currentPlayer: 'p1',
  board: {
    p1hitSquares: [],
    p1missSquares: [],
    p2hitSquares: [],
    p2missSquares: [],
    freeSquares: [],
    ships: {
      p1: {},
      p2: {}
    }
  },
  placingPhase: {
    selectedShip: 'battleship',
    //0 north, 1 east, etc.
    shipOrientation: 1
  },
  shipLengths: {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  },
  GamePlay: {
    // p1Turn: bool,
    // p1Placing: bool,
    // p2Placing: bool,
    // p2Turn: bool,
    // gamePhase: ? (str or num)
    // currentShipOrientation(for placement phase): num (0 - 4)
  },
  findShipsOccupiedSquares(clickedSquare){
    const occupiedSquares = [clickedSquare];
    for(let i = 1; i < this.shipLengths[this.placingPhase.selectedShip]; i++){
      if(this.placingPhase.shipOrientation == 0)
        occupiedSquares.push([clickedSquare[0] - i, clickedSquare[1]])
      if(this.placingPhase.shipOrientation == 1)
        occupiedSquares.push([clickedSquare[0], clickedSquare[1] + i]);
      if(this.placingPhase.shipOrientation == 2)
        occupiedSquares.push([clickedSquare[0] + i, clickedSquare[1]]);
      if(this.placingPhase.shipOrientation == 3)
        occupiedSquares.push([clickedSquare[0], clickedSquare[1] - i]);
    } return occupiedSquares;
  },
  generateBoard: function(){
    let board = [];
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){
        board.push([i,j]);
     }  
    }
    return board;
  }
}

const hasSquare = function(squaresArray, squareToFind){
  if(squaresArray.filter(square => square[0] === squareToFind[0] && square[1] === squareToFind[1]).length > 0)
    return true;
  return false;
}

const isPlacable = function(square){
  const board = state.generateBoard();
  const occupiedSquares = state.findShipsOccupiedSquares(square);
  // console.log(board, occupiedSquares);
  for(shipSquare of occupiedSquares) {
    if(!hasSquare(board, shipSquare))
      return false;
  }
  return true;
}



console.log(isPlacable([1,7]));

const printBoard = () => {
  for(let i = 0; i < 10; i ++){
    let row = '';
    for(let j = 0; j < 10; j++){
      let values = Object.values(state.board.ships['p1']);
      values.forEach(value => {
        if (value.filter(array => array[0] == i && array[1] == j).length > 0){
          row += '[X]';
        } else {
          row += '[ ]';
        }
      });
    }
    console.log(row);
  }
}


module.exports = hasSquare;

