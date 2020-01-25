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
  for(let i = 0; i < 10; i++){
    let row = i;
    for(let j = 0; j < 10; j++){
      $('#board').append(`<div class='square' id='${i}${j}'></div>`);
    }
  }
  $('#board').on('click', setBoardPlacementListeners);
  $('#board').children().mouseover(setHover);
  $('#board').children().mouseout(removePlacableCSS);
}


