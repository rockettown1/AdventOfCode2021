import { input } from "./puzzleInput.js";

/*
Time complexity is O(n2) - come back to this and look for something more efficient
*/
const calcPower = (input) => {
  const inputArr = input.split("\n");
  let log = [];

  for (let i = 0; i < 12; i++) {
    log[i] = 0;
    for (let j = 0; j < inputArr.length; j++) {
      if (inputArr[j][i] > 0) {
        log[i] += 1;
      } else {
        log[i] -= 1;
      }
    }

    //convert log to 1's and 0's based on most common for each bit
    if (log[i] > 0) {
      log[i] = 1;
    } else {
      log[i] = 0;
    }
  }

  const gamma = log.join("");
  const epsilom = log.map((num) => (num > 0 ? 0 : 1)).join("");
  //convert binary strings to decimal numbers and return product
  return parseInt(gamma, 2) * parseInt(epsilom, 2);
};

console.log(calcPower(input));
