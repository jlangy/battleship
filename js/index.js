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
  board: {
    p1hitSquares: [],
    p1missSquares: [],
    p2hitSquares: [],
    p2missSquares: [],
    p1Ships: {},
    p2Ships: {}
  },
  placingPhase: {
    selectedShip: '',
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
  onBoard: function(clickedSquare){
    if(this.placingPhase.shipOrientation == 0){
      
    }
  }
}
//assume clickedSquare is an array [i,j]


const placeShip = (clickedSquare) => {
  const ship = state.placingPhase.selectedShip;
  // if(state.shipLengths[ship])
}

module.exports = state;

