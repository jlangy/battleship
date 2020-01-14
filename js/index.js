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
    ships: {
      p1: {},
      p2: {}
    }
  },
  placingPhase: {
    selectedShip: 'destroyer',
    //0 north, 1 east, etc.
    shipOrientation: 3
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
    const ship = this.placingPhase.selectedShip;
    if(this.placingPhase.shipOrientation == 0)
      return clickedSquare[0] - this.shipLengths[ship] < 0 ? false : true;
    if(this.placingPhase.shipOrientation == 1)
      return clickedSquare[1] + this.shipLengths[ship] > 9 ? false : true;
    if(this.placingPhase.shipOrientation == 2)
      return clickedSquare[0] + this.shipLengths[ship] > 9 ? false : true;
    if(this.placingPhase.shipOrientation == 3)
      return clickedSquare[1] - this.shipLengths[ship] < 0 ? false : true;
  },
  placeShip: function(clickedSquare) {
    const ship = this.placingPhase.selectedShip;
    if(this.onBoard(clickedSquare)){
      const playersShip = this.board.ships[this.currentPlayer][ship] = [clickedSquare];
      for(let i = 1; i < this.shipLengths[ship]; i++){
        if (this.placingPhase.shipOrientation == 0)
          playersShip.push([clickedSquare[0] - i, clickedSquare[1]]);
        if (this.placingPhase.shipOrientation == 1)
          playersShip.push([clickedSquare[0], clickedSquare[1] + i]);
        if (this.placingPhase.shipOrientation == 2)
          playersShip.push([clickedSquare[0] + i, clickedSquare[1]]);
        if (this.placingPhase.shipOrientation == 3)
          playersShip.push([clickedSquare[0], clickedSquare[1] - i]);
      }
    }
  }
}
//assume clickedSquare is an array [i,j]


module.exports = state;

