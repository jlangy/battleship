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
      p2: {'destroyer': [[4,1],[4,2]], 'battleship': [[3,6],[3,5],[3,4],[3,3]]}
    }
  },
  GamePlay: {
    // p1Turn: bool,
    // p1Placing: bool,
    // p2Placing: bool,
    // p2Turn: bool,
    // gamePhase: ? (str or num)
    // currentShipOrientation(for placement phase): num (0 - 4)
  },
  helpers: {
    equalSquares: function(square1, square2){
      return square1[0] === square2[0] && square1[1] === square2[1];
    },
    hasSquare: function(squaresArray, squareToFind){
      if(squaresArray.some(square => this.equalSquares(square, squareToFind)))
        return true;
      return false;
    },
    getPlayerSquares: function(player){
      console.log(player);
      let playerShips = Object.keys(player);
      let takenSquares = [];
      for(ship of playerShips){
        takenSquares = takenSquares.concat(player[ship]);
      }
      return takenSquares;
    },
    printBoard: function(player){
      const takenSquares = this.getPlayerSquares(player);
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

module.exports = state;

