"use strict";

let gameContainer = document.getElementById("gameboard-container");

// 1. Gameboard(module) // 2. Players(Factory) // 3. Controller(module)
// How to stop the game when one of the players win

const Gameboard = (() => {
  const _gameboard = [];

  const start = () => {
    for (let i = 0; i < 9; i++) {
      _gameboard.push("");
    }
  };

  const render = () => {
    gameContainer.innerHTML = "";

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
            console.log(_gameboard); //delete
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
    const lines = [
      [0, 1, 2], // Horizontal
      [0, 3, 6], // Vertical
      [0, 4, 8], // Diagonal left to right
      [2, 4, 6], // Diagonal right to left
    ];

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        let lastPosition = j + lines[i][2];
        if (
          arr[j + lines[i][0]] &&
          arr[j + lines[i][1]] &&
          arr[j + lines[i][2]]
        ) {
          if (lastPosition !== 3) {
            alert("winner");
            return true;
          }
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
