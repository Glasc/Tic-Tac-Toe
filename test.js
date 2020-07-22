let win = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
];

let board = [0, 0, 0, 1, 1, 0, 0, 1, 0];

let roundResult = win.reduce((acc, currWin) => {
  if (acc === false) {
    let roundArray = currWin.filter((currItem, index) => {
      return currItem === board[index] && currItem === 1;
    });
    if (roundArray.length >= 3) {
      return (acc = true);
    }
    return acc;
  } else {
    return acc;
  }
}, false);

console.log(roundResult);
