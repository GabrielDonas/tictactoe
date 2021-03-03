//POSSIBLE WAYS TO SOLVE

const _checkPosition = (arr) => {
  const lines = [
    [0, 1, 2], // Line 1
    [3, 4, 5], // Line 2
    [6, 7, 8], // Line 3
  ];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (!arr[lines[j][i]]) {
        break;
      } else if (arr[lines[j][i]] && j === lines.length - 1) {
        alert("winner");
      }
      //        if (!arr[lines[i][j]]) {
      //          break;
      //        } else if (arr[lines[i][j]] && j === lines.length - 1) {
      //          alert("winner");
      //        } try recursion?
    }
  }
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
      if (
        arr[j + lines[i][0]] &&
        arr[j + lines[i][1]] &&
        arr[j + lines[i][2]]
      ) {
        alert("winner");
        console.log(i + " " + j);
        return true;
      }
    }
  }
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
      if (arr[winningCombos[i][j]] && j === 2) {
        alert("winner");
      }
    }
  }
};
