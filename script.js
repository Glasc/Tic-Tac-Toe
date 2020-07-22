const boxItems = document.querySelectorAll('.box');

const game = (() => {
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
  const myFactory = new PlayerFactory();
  let player1 = myFactory.create('x');
  let player2 = myFactory.create('o');
  let gameRound = 0;
  let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let cross = true;
  const checkWin = (player) => {
    if (gameRound >= 5) {
      // [x,o,0,0,x,o,0,x]
      let tempArr = gameBoard.map((currItem) => {
        if (currItem === player.character) {
          return 1;
        } else {
          return 0;
        }
      });
      let roundResult = win.reduce((acc, currWin) => {
        if (acc === false) {
          let roundArray = currWin.filter((currItem, index) => {
            return currItem === tempArr[index] && currItem === 1;
          });
          if (roundArray.length >= 3) {
            return (acc = true);
          }
          return acc;
        } else {
          return acc;
        }
      }, false);
      return roundResult;
    }
  };

  const reset = () => {
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameRound = 0;
    boxItems.forEach((box) => {
      box.style.backgroundImage = ``;
      box.style.backgroundRepeat = '';
      box.style.backgroundSize = '';
    });
    game.cross = true;
  };
  const playRound = (player, selection) => {
    if (gameRound <= 8) {
      gameBoard[selection] = player.character;
      gameRound++;
      if (gameRound === 9) {
        if (checkWin(player1) === false && checkWin(player2) === false) {
          alert('Draw!');
          reset();
        }
      }
      // if (!gameBoard.includes(0)) {
      //   console.log(gameBoard);
      //   alert('Draw!');
      //   reset();
      // }
    }
  };
  function getCross() {
    return game.cross;
  }
  return {
    player1,
    player2,
    gameBoard,
    checkWin,
    playRound,
    reset,
    gameRound,
    cross,
    getCross,
  };
})();

(function () {
  boxItems.forEach((box) => {
    const isNotSelected = (e) => {
      return !e.target.style.backgroundImage;
    };
    const setColor = (e, image) => {
      e.target.style.backgroundImage = `url('icons/${image}')`;
      e.target.style.backgroundRepeat = 'no-repeat';
      e.target.style.backgroundSize = 'cover';
    };
    box.addEventListener('click', (e) => {
      console.log(game.getCross());
      if (game.cross) {
        if (isNotSelected(e)) {
          setColor(e, 'x.png');
          let squareNumber = parseFloat(e.target.classList[1].charAt(4));
          game.playRound(game.player1, squareNumber);

          game.cross = false;
          if (game.checkWin(game.player1)) {
            alert('Player 1 won!');
            game.reset();
          }
        }
      } else if (!game.cross) {
        if (isNotSelected(e)) {
          setColor(e, 'o.png');
          let squareNumber = parseFloat(e.target.classList[1].charAt(4));
          game.playRound(game.player2, squareNumber);

          game.cross = true;
          if (game.checkWin(game.player2)) {
            alert('Player 2 won!');
            game.reset();
          }
        }
      }
    });
  });
})();

function Player(character) {
  this.character = character; // X or O
  this.board = [];
}

function PlayerFactory() {
  this.create = (character) => {
    if (character === 'x') {
      return new Player('x');
    } else if (character === 'o') {
      return new Player('o');
    }
  };
}

// let gameProgress = ['o', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'o']
// let win = [
//   [1, 1, 1, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 1, 1],
//   [1, 0, 0, 1, 0, 0, 1, 0, 0],
//   [0, 1, 0, 0, 1, 0, 0, 1, 0],
//   [0, 0, 1, 0, 0, 1, 0, 0, 1],
//   [1, 0, 0, 0, 1, 0, 0, 0, 1],
//   [0, 0, 1, 0, 1, 0, 1, 0, 0],
// ]

// let arr = []
// for (let i = 0; i < 9; i++) {
//   if (gameProgress[i] === 'x') {
//     arr.push(1)
//   } else {
//     arr.push(0)
//   }
// }

// let roundResult = win.reduce((acc, curr) => {
//   if (acc === false) {
//     if (curr.toString() === arr.toString()) {
//       return (acc = true)
//     } else {
//       return acc
//     }
//   } else {
//     return acc
//   }
// }, false)

// console.log(roundResult)
