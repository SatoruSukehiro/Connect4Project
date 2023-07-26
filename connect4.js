/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])



function makeBoard() {
  
  for(let x = 0; x < HEIGHT; x++){

    board.push(Array.from({length:WIDTH}));
  }
 
 
}


function makeHtmlBoard() {
  
  const board = document.getElementById('board')
  
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}



  function findSpotForCol(x) {
    
    for(let y = HEIGHT-1; y >= 0; y--){
      if(!board[y][x]){
        return y;
      }
      
    }
    return null;
  }



function placeInTable(y, x) {
  
  newDiv = document.createElement('div');
  newDiv.classList.add('piece');
  if(currPlayer === 1){
    newDiv.classList.add('player1');
} else {
  newDiv.classList.add('player2');
}
  placement = document.getElementById(`${y}-${x}`);
  placement.append(newDiv);
}



function endGame(msg) {
 
  alert(msg)
}



function handleClick(evt) {
  
  var x = +evt.target.id;

  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }


  placeInTable(y, x);
  board[y][x] = currPlayer;


  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
    
  }

  
 if(board.every(row => row.every(cell => cell))){
   return endGame('TIE')
 }

  currPlayer = currPlayer === 1 ? 2 :1 
}



function checkForWin() {
  function _win(cells) {
 

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

 
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        
        return true;
        
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
