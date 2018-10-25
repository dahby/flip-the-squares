'use strict';

const minGame = 3;
const maxGame = 11;
const selector = document.getElementById('selector');
const gameSize = document.getElementById('gameSize');
let clickCount = 0;
let boardArray = [];
const boardStart = document.getElementById('gameBoard');
const clickCounter = document.getElementById('totalClicks');

// Populating drop down for game size

class GamePiece {
  constructor(row, column, location) {
    this.row = row;
    this.column = column;
    this.location = location;
  }
}

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
      boardPiece.setAttribute('class', 'gamePiece');
      boardPiece.setAttribute('id', `${i}-${j}`);
      boardPiece.addEventListener('click', flipPiece);
      boardPieces.push(new GamePiece(i, j, boardPiece));
      boardRow.appendChild(boardPiece);
    }
    boardArray.push(boardPieces);
    boardStart.appendChild(boardRow);
  }
};

const flipPiece = (event) => {
  event.preventDefault();
  const targetString = event.target;
  const selectedPiece = targetString.id.split('-');
  const intArray = selectedPiece.map(x => parseInt(x));
  const clickedClass = boardArray[intArray[0]][intArray[1]];
  adjecentFlipper(clickedClass, targetString);
  clickCount++;
  clickCounter.textContent = `Total Clicks: ${clickCount}`;
  if (isWinner(boardArray)) {
    console.log('WINNER WINNER');
  }
};

const adjecentFlipper = (clicked, eventTarget) => {
  if (!clicked.clicked) {
    clicked.clicked = true;
    eventTarget.classList.add('clicked');
  } else {
    clicked.clicked = false;
    eventTarget.classList.remove('clicked');
  }
  console.log(clicked);
};

// Checking if winner
const isWinner = (totalObjects) => {
  for (let i = 0; i < totalObjects.length; i++) {
    for (let j = 0; j < totalObjects[i].length; j++) {
      if (!totalObjects[i][j].clicked) {
        return false;
      }
    }
  }
  return true;
};

// Tying game population to submit button

gameSize.addEventListener('submit', generateGame);
