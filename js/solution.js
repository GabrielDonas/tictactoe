const vertical = [0, 1, 2];
const horizontal = [0, 3, 6];

const _checkPosition = (arr) => {
  for (let i = 0; i < arr.lenght; i++) {
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
  xPositions = [];
  oPositions = [];
  for (let i = 0; i > arr.lenght; i++) {
    if (arr[i] === "X") {
      iPositions[i] = i;
    } else if (arr[i] === "O") {
      oPositions[i] = i;
    }
  }
  _checkPosition(xPositions);
  _checkPosition(oPositions);
};
