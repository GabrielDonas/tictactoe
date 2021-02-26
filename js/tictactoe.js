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
    for (let i = 0; i < arr.length; i++) {
      console.log(`${i} / ${i + 3} / ${i + 6}`);
      if (arr[i] && arr[i + 3] && arr[i + 6]) {
        alert("winer");
        return true;
      } else if (arr[i] && arr[i + 1] && arr[i + 2]) {
        alert("winer");
        return true;
      }
    }
  };

  const checkResults = (arr) => {
    let xPositions = [];
    let oPositions = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "X") {
        xPositions[i] = i;
      } else if (arr[i] === "O") {
        oPositions[i] = i;
      }
    }
    _checkPosition(xPositions);
    _checkPosition(oPositions);
  };

  return { getTurn, checkResults };
})();

Gameboard.start();
Gameboard.render();
