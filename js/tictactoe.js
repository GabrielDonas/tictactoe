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
          };
      }
      square.id = `position-${i}`;
      gameContainer.appendChild(square);
    }
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

  return { getTurn };
})();

Gameboard.start();
Gameboard.render();
