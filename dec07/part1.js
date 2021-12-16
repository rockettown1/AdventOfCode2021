import { input } from "./puzzleInput.js";

const arr = input.split(",");
const fuelOptions = [];

for (let i = Math.min(...arr); i <= Math.max(...arr); i++) {
  const diffs = [];
  for (let j = 0; j < arr.length; j++) {
    diffs.push(Math.abs(i - arr[j]));
  }

  fuelOptions.push(diffs.reduce((total, cur) => total + cur));
}

console.log(Math.min(...fuelOptions));
