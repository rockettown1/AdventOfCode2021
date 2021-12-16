import { depths } from "./puzzleInput.js";

const threeSlidingWindowSum = (input) => {
  return input
    .split("\n")
    .map((item) => +item)
    .reduce((count, curr, i, arr) => {
      if (
        arr[i + 1] + arr[i + 2] + arr[i + 3] >
        arr[i] + arr[i + 1] + arr[i + 2]
      ) {
        return ++count;
      }
      return count;
    }, 0);
};

const checker = (arr) => {
  let count = 0;
  let input = arr.split("\n").map((item) => +item);
  for (let i = 0; i < input.length; i++) {
    let arr1 = input.slice(i, i + 3);

    let arr2 = input.slice(i + 1, i + 4);
    if (arr1.length > 0 && arr2.length > 0) {
      let window1 = arr1.reduce((total, curr) => total + curr);
      let window2 = arr2.reduce((total, curr) => total + curr);
      if (window2 > window1) {
        count++;
      }
    }
  }
  return count;
};

console.log(checker(depths));
