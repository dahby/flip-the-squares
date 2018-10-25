'use strict';

const minGame = 5;
const maxGame = 11;
let boardArray = [];
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
  boardArray = [];
  for (let i = 0; i < dimensions; i++) {
    const boardPieces = [];
    let boardRow = document.createElement('section');
    boardRow.setAttribute('id', `row${i}`);
    for (let j = 0; j < dimensions; j++) {
      let boardPiece = document.createElement('div');
      boardPiece.setAttribute('id', `piece${i}${j}`);
      boardPieces.push(boardPiece);
      boardRow.appendChild(boardPiece);
    }
    boardArray.push(boardPieces);
    boardStart.appendChild(boardRow);
  }
  console.log(boardArray);
};

// Tying game population to submit button

gameSize.addEventListener('submit', generateGame);
