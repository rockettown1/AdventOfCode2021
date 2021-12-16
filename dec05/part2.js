import { input } from "./puzzleInput.js";

const arr = input.split("\n");

const numbers = input.match(/(\d+)/g);
const max = Math.max(...numbers);
let coords = [];

for (let i = 0; i < arr.length; i++) {
  coords.push(arr[i].match(/(\d+)/g));
}

//make coordinates easier to work with for straightlines and diagonals
const constX = coords
  .map((nums) => {
    if (nums[0] === nums[2]) {
      return { x: +nums[0], y: [+nums[1], +nums[3]] };
    }
  })
  .filter((items) => items);

const constY = coords
  .map((nums) => {
    if (nums[1] === nums[3]) {
      return { y: +nums[1], x: [+nums[0], +nums[2]] };
    }
  })
  .filter((items) => items);

const diagonals = coords
  .map((nums) => {
    if (nums[0] != nums[2] && nums[1] != nums[3]) {
      return { start: [+nums[0], +nums[1]], end: [+nums[2], +nums[3]] };
    }
  })
  .filter((items) => items);

// make the board
const theBoard = [];
for (let i = 0; i < max + 1; i++) {
  const row = [];
  for (let j = 0; j < max + 1; j++) {
    row.push(0);
  }
  theBoard.push(row);
}

//place horizontal lines
for (let i = 0; i < constX.length; i++) {
  for (let j = 0; j < theBoard.length; j++) {
    if (j == constX[i].x) {
      for (let k = 0; k < theBoard[j].length; k++) {
        if (
          k >= Math.min(constX[i].y[0], constX[i].y[1]) &&
          k <= Math.max(constX[i].y[0], constX[i].y[1])
        ) {
          theBoard[j][k] += 1;
        }
      }
    }
  }
}
//place vertical lines
for (let i = 0; i < constY.length; i++) {
  for (let j = 0; j < theBoard.length; j++) {
    if (
      j >= Math.min(constY[i].x[0], constY[i].x[1]) &&
      j <= Math.max(constY[i].x[0], constY[i].x[1])
    ) {
      for (let k = 0; k < theBoard[j].length; k++) {
        if (k == constY[i].y) {
          theBoard[j][k] += 1;
        }
      }
    }
  }
}

//place diagonals
for (let i = 0; i < diagonals.length; i++) {
  //if x1 < x2
  let countUp = 0;
  let countDown = diagonals[i].start[1];
  if (diagonals[i].start[0] < diagonals[i].end[0]) {
    for (let j = diagonals[i].start[0]; j <= diagonals[i].end[0]; j++) {
      //if y1 < y2
      if (diagonals[i].start[1] < diagonals[i].end[1]) {
        for (let k = countUp; k < theBoard[j].length; k++) {
          if (k == diagonals[i].start[1]) {
            theBoard[j][k] += 1;
            break;
          } else if (k >= diagonals[i].start[1] && k <= diagonals[i].end[1]) {
            theBoard[j][k] += 1;
            break;
          }
          countUp++;
        }
      } else {
        //if y1 > y2
        for (let k = countDown; k >= diagonals[i].end[1]; k--) {
          if (k == diagonals[i].start[1]) {
            theBoard[j][k] += 1;
            break;
          } else if (k >= diagonals[i].end[1]) {
            theBoard[j][k] += 1;
            break;
          }
        }
      }

      countUp++;
      countDown--;
    }
  } else {
    //if x1 > x2
    for (let j = diagonals[i].start[0]; j >= diagonals[i].end[0]; j--) {
      //if y1 < y2
      if (diagonals[i].start[1] < diagonals[i].end[1]) {
        for (let k = countUp; k < theBoard[j].length; k++) {
          if (k == diagonals[i].start[1]) {
            theBoard[j][k] += 1;
            break;
          } else if (k >= diagonals[i].start[1] && k <= diagonals[i].end[1]) {
            theBoard[j][k] += 1;
            break;
          }
          countUp++;
        }
      } else {
        //if y1 > y2
        for (let k = countDown; k >= diagonals[i].end[1]; k--) {
          if (k == diagonals[i].start[1]) {
            theBoard[j][k] += 1;
            break;
          } else if (k >= diagonals[i].end[1]) {
            theBoard[j][k] += 1;
            break;
          }
        }
      }

      countUp++;
      countDown--;
    }
  }
}

console.log(theBoard.flat().filter((num) => num > 1).length);
