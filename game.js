// HTML elements
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell"); // array like object
const gameBoard = document.querySelector(".game-board")

// game constants
const X_SYMBOL = "×"
const O_SYMBOL = "○"

// game variables
let gameIsLive = true; // if true, game is going
let xIsNext = true; // false = O turn
let winner = null;

// functions

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1]
  const topMiddle = cellDivs[1].classList[1]
  const topRight = cellDivs[2].classList[1]
  const middleLeft = cellDivs[3].classList[1]
  const middleMiddle = cellDivs[4].classList[1]
  const middleRight = cellDivs[5].classList[1]
  const bottomLeft = cellDivs[6].classList[1]
  const bottomMiddle = cellDivs[7].classList[1]
  const bottomRight = cellDivs[8].classList[1]

  // check for winner - 8 cases
  // TO-DO: see if there's a dynamic way to do this
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    processWinner(topLeft);
    cellDivs[0].classList.add("won");
    cellDivs[1].classList.add("won");
    cellDivs[2].classList.add("won");
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    processWinner(middleLeft)
    cellDivs[3].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[5].classList.add("won");
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    processWinner(bottomLeft)
    cellDivs[6].classList.add("won");
    cellDivs[7].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    processWinner(topLeft)
    cellDivs[0].classList.add("won");
    cellDivs[3].classList.add("won");
    cellDivs[6].classList.add("won");
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    processWinner(topMiddle)
    cellDivs[1].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[7].classList.add("won");
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    processWinner(topRight)
    cellDivs[2].classList.add("won");
    cellDivs[5].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    processWinner(topLeft)
    cellDivs[0].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[8].classList.add("won");
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    processWinner(topRight)
    cellDivs[2].classList.add("won");
    cellDivs[4].classList.add("won");
    cellDivs[6].classList.add("won");
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    // tie
    gameIsLive = false;
    statusDiv.innerHTML = `Game is tied!`
  } else {
    // change turn
    statusDiv.innerHTML = xIsNext ? `${X_SYMBOL} is next` : `<span>${O_SYMBOL} is next</span>`
  }

}

const processWinner = (cell) => {
  gameIsLive = false;
  winner = cell;
  if (winner === "x") {
    statusDiv.innerHTML = `Woohoo! ${letterToSymbol(winner)} has won!`
  } else {
    statusDiv.innerHTML = `<span>Woohoo! ${letterToSymbol(winner)} has won!<span/>`
  }

}

const letterToSymbol = (letter) => {
  return letter === "x" ? X_SYMBOL : O_SYMBOL;
}

// event handlers
const handleReset = (e) => {
  xIsNext = true;
  gameIsLive = true;
  statusDiv.innerHTML = `${X_SYMBOL} goes first!`
  for (let cellDiv of cellDivs) {
    cellDiv.classList.remove("x")
    cellDiv.classList.remove("o")
    cellDiv.classList.remove("won")
  };
}

const handleCellClick = e => {
  if (!gameIsLive) return;
  const classList = e.target.classList

  // if it already has an X or O class
  if (classList[1]) return;

  if (xIsNext) {
    classList.add("x")
    xIsNext = !xIsNext;
    checkGameStatus();
  } else {
    classList.add("o");
    xIsNext = !xIsNext;
    checkGameStatus();
  }
}

// event listeners
resetDiv.addEventListener("click", handleReset)
gameBoard.addEventListener("click", handleCellClick)