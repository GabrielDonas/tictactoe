"use strict";

let gameContainer = document.getElementById("gameboard-container");

// 1. Gameboard(module) // 2. Players(Factory) // 3. Controller(module)

const Gameboard = (() => {
  const _gameboard = [];

  const start = () => {
    for (let i = 0; i < 9; i++) {
      _gameboard.push("");
    }
  };

  const render = () => {
    for (const i in _gameboard) {
      let square = document.createElement("div");
      switch (_gameboard[i]) {
        case "O":
          square.classList.add("o", "square");
          square.innerHTML = "0";
          break;
        case "X":
          square.classList.add("x", "square");
          square.innerHTML = "1";
          break;
        default:
          square.classList.add("blank-square", "square");
      }
      square.id = `position-${i}`;
      gameContainer.appendChild(square);
    }
  };
  return { render, start };
})();

Gameboard.start();
Gameboard.render();
