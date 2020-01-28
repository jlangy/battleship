const generateBoard = function(){
  let board = [];
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
      board.push([i,j]);
   }  
  }
  return board;
}

const printBoard = function(player){
  const takenSquares = getPlayerSquares(player);
  for(let i = 0; i < 10; i ++){
    let row = '';
    for(let j = 0; j < 10; j++){   
      if(takenSquares.some(square => square[0] === i && square[1] === j))
        row += '[X]';
      else
        row += '[ ]'; 
    } 
  }
}

const renderBoard = function(){
  $('#board').empty();
  $('#board').off();
  const coords = "ABCDEFGHIJ".split('');
  for(let i = 0; i < 11; i++){
    if(i === 0){
      $('#board').append('<div class="coordSquare"></div>')
    } else {
      $('#board').append(`<div class="coordSquare">${i}</div>`)
    }
  }
  for(let i = 0; i < 10; i++){
    let row = i;
    $('#board').append(`<div class="coordSquare">${coords[i]}</div>`);
    for(let j = 0; j < 10; j++){
      if(state.playPhase === "gamePlay"){
        const currentSquare =  getSquareFromId(`${i}${j}`);
        const playerMisses = state[state.currentBoard].missSquares;
        const playerHits = state[state.currentBoard].hitSquares;
        if(hasSquare(playerHits, currentSquare)){
          $('#board').append(`<div class='square hitSquare' id='${i}${j}'></div>`);
        }
        else if(hasSquare(playerMisses, currentSquare)){
          $('#board').append(`<div class='square missSquare' id='${i}${j}'></div>`);
        } else{
          $('#board').append(`<div class='square' id='${i}${j}'></div>`);
        }
      } else {
        $('#board').append(`<div class='square' id='${i}${j}'></div>`);
      }
    }
  }
}

const renderDisplayBoard = function(){
  $('#displayBoard').empty();
  const coords = "ABCDEFGHIJ".split('');
  for(let i = 0; i < 11; i++){
    if(i === 0){
      $('#displayBoard').append('<div class="coordSquare"></div>')
    } else {
      $('#displayBoard').append(`<div class="coordSquare">${i}</div>`)
    }
  }
  for(let i = 0; i < 10; i++){
    let row = i;
    $('#displayBoard').append(`<div class="coordSquare">${coords[i]}</div>`)
    for(let j = 0; j < 10; j++){
      drawDisplaySquare(i,j);
    }
  }
}

const drawDisplaySquare = (i,j) => {
  const currentSquare =  getSquareFromId(`${i}${j}`);
  const playerShipSquares = getPlayerSquares(state[state.currentBoard].ships);
  const opponentsMisses = state[state.opponentBoard].missSquares;
  const opponentsHits = state[state.opponentBoard].hitSquares;
  //check if it is a shipsquare, hitsquare, or misssquare to add correct classes
  if(hasSquare(opponentsHits, currentSquare)){
    $('#displayBoard').append(`<div class='square hitSquare' id='d${i}${j}'></div>`);
  }
  else if(hasSquare(opponentsMisses, currentSquare)){
    $('#displayBoard').append(`<div class='square missSquare' id='d${i}${j}'></div>`);
  }
  else if (hasSquare(playerShipSquares, currentSquare)){
    $('#displayBoard').append(`<div class='square hasShip' id='d${i}${j}'></div>`);
  } else {
  $('#displayBoard').append(`<div class='square' id='d${i}${j}'></div>`);
  }
}

const disableBoard = () => {
  $('#board').off();
  $('#board').children().off();
  $('body').off();
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
