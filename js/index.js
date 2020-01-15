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
      p1: {'destroyer': [[1,1],[1,2]], 'battleship': [[3,3],[4,3],[5,3],[6,3]]},
      p2: {}
    }
  },
  placingPhase: {
    selectedShip: 'submarine',
    //0 north, 1 east, etc.
    shipOrientation: 0
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
let board = state.generateBoard();

const equalSquares = (square1, square2) => square1[0] === square2[0] && square1[1] === square2[1];

const hasSquare = function(squaresArray, squareToFind){
  if(squaresArray.some(square => equalSquares(square, squareToFind)))
    return true;
  return false;
}

const isPlacable = function(square){
  const occupiedSquares = state.findShipsOccupiedSquares(square);
  return occupiedSquares.every(square => hasSquare(board, square));
}

const place = function(square){
  if(isPlacable(square)){
    const currentPlayer = state.currentPlayer;
    const shipName = state.placingPhase.selectedShip;
    const shipSquares = state.findShipsOccupiedSquares(square);
    state.board.ships[currentPlayer][shipName] = shipSquares;
    for(shipSquare of shipSquares){
      board = board.filter(boardSquare => !equalSquares(boardSquare, shipSquare));
    }
  } // TODO: Else logic 
}

place([6,9]);
place([8,9]);


const printBoard = (player) => {
  let playerShips = Object.keys(player);
  let takenSquares = [];
  for(ship of playerShips){
    takenSquares = takenSquares.concat(player[ship]);
  }
  for(let i = 0; i < 10; i ++){
    let row = '';
    for(let j = 0; j < 10; j++){   
      if(takenSquares.some(square => square[0] === i && square[1] === j))
        row += '[X]';
      else
        row += '[ ]'; 
    } 
    console.log(row);
  }
}

printBoard(state.board.ships['p1']);

module.exports = hasSquare;

