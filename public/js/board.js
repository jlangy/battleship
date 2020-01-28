const coords = "ABCDEFGHIJ".split('');

const generateBoard = function(){
  let board = [];
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      board.push([i,j]);
    }  
  }
  return board;
}

const renderBoard = function(board){
  board.empty();
  board.off()
  drawLetterCoords(board);
  for(let i = 0; i < 10; i++){
    let row = i;
    board.append(`<div class="coordSquare">${coords[i]}</div>`)
    for(let j = 0; j < 10; j++){
      if (board.attr('id') === "board"){
        drawBoardSquare(i,j);
      } else {
        drawDisplaySquare(i,j);
      }
    }
  }
}

const drawBoardSquare = (i,j) => {
  $('#board').append(`<div class='square' id='${i}${j}'></div>`);
  if(state.playPhase === "gamePlay"){
    const currentSquare =  getSquareFromId(`${i}${j}`);
    const squareElement = $(`#${i}${j}`);
    const playerMisses = state[state.currentBoard].missSquares;
    const playerHits = state[state.currentBoard].hitSquares;
    if(hasSquare(playerHits, currentSquare)){
      $(squareElement).addClass('displayHitSquare');
    }
    else if(hasSquare(playerMisses, currentSquare)){
      $(squareElement).addClass('displayMissSquare');
    }
  }
}

const drawDisplaySquare = (i,j) => {
  $('#displayBoard').append(`<div class='square' id='d${i}${j}'></div>`);
  const currentSquare =  getSquareFromId(`${i}${j}`);
  const squareElement = $(`#d${i}${j}`);
  const playerShipSquares = getPlayerSquares(state[state.currentBoard].ships);
  const opponentsMisses = state[state.opponentBoard].missSquares;
  const opponentsHits = state[state.opponentBoard].hitSquares;
  if(hasSquare(opponentsHits, currentSquare)){
    $(squareElement).addClass('displayHitSquare');
  }
  else if(hasSquare(opponentsMisses, currentSquare)){
    $(squareElement).addClass('displayMissSquare');
  }
  else if (hasSquare(playerShipSquares, currentSquare)){
    $(squareElement).addClass('hasShip');
  }
}

drawLetterCoords = board => {
  for(let i = 0; i < 11; i++){
    if(i === 0){
      board.append('<div class="coordSquare"></div>')
    } else {
      board.append(`<div class="coordSquare">${i}</div>`)
    }
  }
}

const disableBoard = () => {
  $('#board').off();
  $('#board').children().off();
  $('body').off();
}

const renderShips = (playerShips) => {
  for(const ship of shipLengths){
    if(Object.keys(playerShips).includes(ship.name)){
      $('#ships').append(`<p class="displayShipAlive">${ship.name}</p>`);
    } else {
      $('#ships').append(`<p class="displayShipSunk">${ship.name}</p>`);
    }
  }
}

const clearBoard = () => {
  disableBoard();
  $('#display-board-container').css('display', 'none');
  $('#board-title').text("");
  $('#display-board-title').text("");
  $('#board').empty();
  $('#displayBoard').empty();
  $('#game-display').css('display', 'none');
}
