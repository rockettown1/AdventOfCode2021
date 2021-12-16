import { depths } from "./puzzleInput.js";

const timesIncreased = (input) => {
  return input
    .split("\n")
    .map((item) => +item)
    .reduce((count, curr, i, arr) => (arr[i + 1] > curr ? ++count : count), 0);
};

timesIncreased(depths);
