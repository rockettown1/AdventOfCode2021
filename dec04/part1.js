import { puzzleInput } from "./puzzleInput.js";

/**
 * @function bingo
 * @param input puzzleInput string
 * @returns object containing winning board array and the last number called
 */
const bingo = (input) => {
  const arr = input.split("\n\n");

  const numbers = arr
    .splice(0, 1)[0]
    .match(/(\d+)/g)
    .map((num) => +num);

  const boardArr = [];

  for (let i = 0; i < arr.length; i++) {
    boardArr.push(arr[i].split("\n"));
  }

  const boards = boardArr.map((board) => {
    let newBoard = [];
    for (let i = 0; i < board.length; i++) {
      newBoard.push(board[i].match(/(\d+)/g).map((num) => +num));
    }
    return newBoard;
  });

  //for each bingo number
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      for (let k = 0; k < boards[j].length; k++) {
        for (let m = 0; m < boards[j][k].length; m++) {
          if (boards[j][k][m] === numbers[i]) {
            boards[j][k][m] = "x";
          }

          //check for complete rows
          let row = boards[j][k].filter((item) => item === "x");
          if (row.length === 5) {
            console.log("Bingo!");
            return { board: boards[j], num: numbers[i] };
          }
          // check for complete columns (Transpose array and use row logic)
          let T = boards[j][k].map((_, colIndex) =>
            boards[j].map((row) => row[colIndex])
          );
          let col = T[k].filter((item) => item === "x");
          if (col.length === 5) {
            console.log("Bingo!");

            return { board: boards[j], num: numbers[i] };
          }
        }
      }
    }
  }
};

const findWinner = (input) => {
  const { board, num } = bingo(input);

  const boardTotal = board
    .flat()
    .filter((item) => item !== "x")
    .reduce((total, cur) => total + cur);

  return boardTotal * num;
};

console.log(findWinner(puzzleInput));
