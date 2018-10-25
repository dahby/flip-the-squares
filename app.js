'use strict';

const boardStart = document.getElementById('gameBoard');

for (let i = 0; i < 5; i++) {
  let boardRow = document.createElement('section');
  boardRow.setAttribute('id', `row${i}`);
  for (let j = 0; j < 5; j++) {
    let boardPiece = document.createElement('div');
    boardPiece.setAttribute('id', `piece${i}${j}`);
    boardRow.appendChild(boardPiece);
  }
  boardStart.appendChild(boardRow);
}

