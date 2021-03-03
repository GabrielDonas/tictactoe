"use strict";

let gameContainer = document.getElementById("gameboard-container");

// 1. Gameboard(module) // 2. Players(Factory) // 3. Controller(module)

const Gameboard = (() => {
  const _gameboard = [];

  const start = () => {
    //gameContainer.appendChild()
  };

  const render = () => {
    gameContainer.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      _gameboard.push("");
    }

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
  return { render, start };
})();

const Player = (name) => {
  const getName = () => name;

  return { getName };
};

const controller = (() => {
  let _turn = 0;
  const getTurn = () => {
    _turn++;
    return _turn & 1 ? "firstPlayerTurn" : "secondPlayerTurn";
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
          //document.getElementsByClassName("square").style.color = "blue";
          alert(" winner");
        }
      }
    }
  };

  const checkResults = (arr) => {
    let xPositions = new Array(9);
    let oPositions = new Array(9);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "X") {
        xPositions[i] = "X";
      } else if (arr[i] === "O") {
        oPositions[i] = "O";
      }
    }
    _checkPosition(xPositions);
    _checkPosition(oPositions);
  };

  return { getTurn, checkResults };
})();

Gameboard.start();
Gameboard.render();
