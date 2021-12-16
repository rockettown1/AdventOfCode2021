import { input } from "./puzzleInput.js";

const testInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const counter = (input) => {
  const arr = input.split("\n").map((item) => {
    return item.split(" | ");
  });

  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    const [signals, outputs] = arr[i];
    outputs.split(" ").forEach((value) => {
      if ([2, 3, 4, 7].includes(value.length)) count++;
    });
  }
  return count;
};

console.log(counter(input));
