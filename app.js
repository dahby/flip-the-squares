'use strict';

const minGame = 5;
const maxGame = 11;
const gameSize = document.getElementById('gameSize');
const boardStart = document.getElementById('gameBoard');
const selector = document.getElementById('selector');

// Populating drop down for game size

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

  // Removing existing game board

  while (boardStart.firstChild) {
    boardStart.removeChild(boardStart.firstChild);
  }

  // Dynamically creating the game board

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

// Tying game population to submit button

gameSize.addEventListener('submit', generateGame);
