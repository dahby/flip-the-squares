'use strict';

const minGame = 5;
const maxGame = 11;
const gameSize = document.getElementById('gameSize');
const boardStart = document.getElementById('gameBoard');
const selector = document.getElementById('selector');

const gameOptions = () => {
  for (let x = minGame; x <= maxGame; x += 2) {
    let num = document.createElement('option');
    num.setAttribute('value', x);
    num.textContent = `${x} x ${x}`;
    selector.appendChild(num);
  }
};

gameOptions();

const generateGame = (event) => {
  event.preventDefault();
  while (boardStart.firstChild) {
    boardStart.removeChild(boardStart.firstChild);
  }
  const dimensions = event.target.selector.value;
  for (let i = 0; i < dimensions; i++) {
    let boardRow = document.createElement('section');
    boardRow.setAttribute('id', `row${i}`);
    for (let j = 0; j < dimensions; j++) {
      let boardPiece = document.createElement('div');
      boardPiece.setAttribute('id', `piece${i}${j}`);
      boardRow.appendChild(boardPiece);
    }
    boardStart.appendChild(boardRow);
  }
};

gameSize.addEventListener('submit', generateGame);
