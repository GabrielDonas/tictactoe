"use strict";
//Create local storages and update the scores
//Include the winner name in the game over screen
let gameContainer = document.getElementById("gameboard-container");
let startScreen = document.getElementById("start-screen");
let scoreDisplay = document.getElementById("score");

let playerOneInput = document.getElementById("player1");
let playerTwoInput = document.getElementById("player2");
let playerOneContainer = document.getElementById("player1-container");
let playerTwoContainer = document.getElementById("player2-container");
let playerOne;
let playerTwo;

let gameOverScreen = document.getElementById("gameover-screen");
let winnerName = document.getElementById("winner");
let restartButton = document.getElementById("restart-button");
let resetButton = document.getElementById("reset-button");

const Gameboard = (() => {
  let _gameboard = [];

  const start = () => {
    if (playerOne && playerTwo) {
      setLocalStorage();
      gameContainer.style.display = "flex";
    } else {
      gameContainer.style.display = "none";
      gameOverScreen.style.display = "none";
      playerOneInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          playerOneInput.disabled = true;
          playerTwoContainer.style.display = "block";
          playerTwoInput.focus();
          playerOne = Player(event.target.value, 1);
        }
      });

      playerTwoInput.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          playerTwo = Player(event.target.value, 2);
          startScreen.style.display = "none";
          gameContainer.style.display = "flex";
          render();
        }
      });
    }

    for (let i = 0; i < 9; i++) {
      _gameboard.push("");
    }
  };

  const gameOver = () => {
    gameOverScreen.style.display = "block";
    console.log(playerOne.getName());
    winnerName.innerHTML =
      controller.getTurn() === "firstPlayerTurn"
        ? `${playerOne.getName()} wins!`
        : `${playerTwo.getName()} wins!`;
    restartButton.addEventListener("click", () => {
      gameOverScreen.style.display = "none";
      _gameboard = [];
      controller.resetTurn();
      start();
      render();
    });
    resetButton.addEventListener("click", () => {
      //clear Local Storage
      location.reload();
    });
  };

  const render = () => {
    gameContainer.innerHTML = "";
    scoreDisplay.innerHTML = "";

    //Players Render
    const renderPlayer = (player) => {
      let playerName = document.createElement("div");
      playerName.innerHTML = `${player.getName()}(${player.getScore()})`;
      scoreDisplay.appendChild(playerName);
      if (!player.getPosition()) {
        playerName.style.color = "rgb(0, 255, 0)";
      }
    };
    renderPlayer(playerOne);
    renderPlayer(playerTwo);

    //Gameboard Render
    for (const i in _gameboard) {
      let square = document.createElement("div");
      switch (_gameboard[i]) {
        case "O":
          square.classList.add("o", "square");
          square.innerHTML = "O";
          break;
        case "X":
          square.classList.add("x", "square");
          square.innerHTML = "X";
          break;
        default:
          square.classList.add("blank-square", "square");
          square.onclick = () => {
            controller.addTurn();
            _gameboard[i] =
              controller.getTurn() === "firstPlayerTurn" ? "X" : "O";
            render();
          };
      }
      square.id = `position-${i}`;
      gameContainer.appendChild(square);
    }
    controller.checkResults(_gameboard);
  };
  return { render, start, gameOver };
})();

const Player = (name, position) => {
  let _score = 0;

  const getName = () => name;

  const getPosition = () => {
    console.log();
    let turn = controller.getTurn() === "firstPlayerTurn" ? 1 : 2;
    return turn === position ? true : false;
  };

  const getScore = () => _score;

  const win = () => {
    _score++;
  };

  return { getName, getPosition, getScore, win };
};

const controller = (() => {
  let _turn = 0;

  const getTurn = () => {
    return _turn & 1 ? "firstPlayerTurn" : "secondPlayerTurn";
  };

  const addTurn = () => {
    _turn++;
  };

  const resetTurn = () => {
    _turn = 0;
  };

  const _checkPosition = (arr) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      for (let j = 0; j < winningCombos[i].length; j++) {
        let lastSquare = winningCombos[i].length - 1;
        if (!arr[winningCombos[i][j]]) {
          break;
        } else if (arr[winningCombos[i][j]] && j === lastSquare) {
          Gameboard.gameOver();
          return playerOne.getPosition() ? playerOne.win() : playerTwo.win();
        }
      }
    }
  };

  const checkResults = (arr) => {
    let xPositions = new Array(9);
    let oPositions = new Array(9);
    let checkDraw = 0; //delete
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "X") {
        xPositions[i] = "X";
        checkDraw++;
      } else if (arr[i] === "O") {
        oPositions[i] = "O";
        checkDraw++;
      }
      if (checkDraw === arr.length) {
        Gameboard.gameOver();
      }
    }
    _checkPosition(xPositions);
    _checkPosition(oPositions);
  };

  return { getTurn, checkResults, resetTurn, addTurn };
})();

//localStorage
function setLocalStorage() {
  localStorage.setItem("playerOneName", playerOne.getName());
  localStorage.setItem("playerTwoName", playerTwo.getName());
  localStorage.setItem("playerOneScore", playerOne.getScore().toString());
  localStorage.setItem("playerTwoScore", playerTwo.getScore().toString());
}

function getLocalStorage() {
  const playerOneName = localStorage.getItem("playerOneName");
  const playerTwoName = localStorage.getItem("playerTwoName");
  const playerOneScore = parseInt(localStorage.getItem("playerOneScore"));
  const playerTwoScore = parseInt(localStorage.getItem("playerTwoScore"));

  if (playerOneName && playerTwoName) {
    playerOne = Player(playerOneName, 1);
    playerTwo = Player(playerTwoName, 2);
    return true;
  } else {
    return false;
  }
}

function clearLocalStorage() {
  localStorage.setItem("playerOneName", "");
  localStorage.setItem("playerTwoName", "");
}

/*
function setLocalStorage() {
  localStorage.setItem("playerOne", JSON.stringify(playerOne));
  console.log(playerOne);
  localStorage.setItem("playerTwo", JSON.stringify(playerTwo));
}

function getLocalStorage() {
  if (!playerOne && !playerTwo) {
    playerOne = JSON.parse(localStorage.getItem("playerOne"));
    playerTwo = JSON.parse(localStorage.getItem("playerTwo"));
  }
}
*/
Gameboard.start();
