import { input } from "./puzzleInput.js";

// let testInput = `3,4,3,1,2`;

const inputArray = input.split(",");

//setup tracking array - the index of each item represents the timer number, the items in the array track the total number of each timer.
const school = [];
for (let i = 0; i < 9; i++) {
  school[i] = 0;
}

for (let i = 0; i < inputArray.length; i++) {
  school[inputArray[i]] += 1;
}

function increase(arr) {
  const temp0 = arr[0];
  for (let i = 0; i < 8; i++) {
    arr[i] = arr[i + 1];
  }
  arr[8] = temp0;
  arr[6] += temp0;
}

function total(arr, days) {
  const copyarr = [...arr];
  for (let i = 0; i < days; i++) {
    increase(copyarr);
  }

  return copyarr.reduce((accu, curr) => accu + curr);
}

total(school, 256);
