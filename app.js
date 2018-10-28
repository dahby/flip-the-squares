'use strict';

const minGame = 3;
const maxGame = 11;
const selector = document.getElementById('selector');
const gameSize = document.getElementById('gameSize');
let clickCount = 0;
let boardArray = [];
const boardStart = document.getElementById('gameBoard');
const clickCounter = document.getElementById('totalClicks');
const gameWon = document.getElementById('gameWon');

gameWon.style.display = 'none';
// boardStart.style.display = 'none';
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
  clickCount = 0;
  localStorage.setItem('click count', clickCount);

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
  const center = boardArray[intArray[0]][intArray[1]];
  adjacentFlipper(center, targetString);
  if (intArray[1] !== boardArray.length - 1) {
    const right = boardArray[intArray[0]][intArray[1] + 1];
    adjacentFlipper(right, targetString.nextSibling);
  }
  if (intArray[1] !== 0) {
    const left = boardArray[intArray[0]][intArray[1] - 1];
    adjacentFlipper(left, targetString.previousSibling);
  }
  if (intArray[0] !== boardArray.length - 1) {
    const bottom = boardArray[intArray[0] + 1][intArray[1]];
    adjacentFlipper(bottom, targetString.parentNode.parentNode.childNodes[intArray[0] + 1].childNodes[intArray[1]]);
  }
  if (intArray[0] !== 0) {
    const top = boardArray[intArray[0] - 1][intArray[1]];
    adjacentFlipper(top, targetString.parentNode.parentNode.childNodes[intArray[0] - 1].childNodes[intArray[1]]);
  }

  clickCount++;
  clickCounter.textContent = `Total Clicks: ${clickCount}`;
  localStorage.setItem('click count', clickCount);
  if (isWinner(boardArray)) {
    console.log('WINNER WINNER');
    boardStart.style.display = 'none';
    gameWon.style.display = 'block';
  }
};

const adjacentFlipper = (clicked, eventTarget) => {
  if (!clicked.clicked) {
    clicked.clicked = true;
    eventTarget.classList.add('clicked');
  } else {
    clicked.clicked = false;
    eventTarget.classList.remove('clicked');
  }
  // console.log(clicked);
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
