import { input } from "./puzzleInput.js";

/*strategy:
1. starting with an array of 1000 values, loop through array splitting values into two separate arrays based on whether the first digit is 1 or 0. 
2. At the end of the first pass, compare the lengths of both arrrays to see which one is longer (most common)
3. reassign the array being looped through to the most common one
4. repeat the process for the next digit
5. when all bits have been loopped through the two arrays should have max 1 value in
6. determine which one to return based on whether its Oxygen rating of CO2 rating.
7. Run this process once for Oxygen rating and once for CO2 rating and return their product for Life Support Rating.
*/

const lifeSupportRating = (input) => {
  const rating = (input, type) => {
    let inputArr = input.split("\n");
    let a = [];
    let b = [];
    for (let i = 0; i < 12; i++) {
      if (inputArr.length == 0) {
        break;
      }
      //reset arrays each loop
      a = [];
      b = [];
      for (let j = 0; j < inputArr.length; j++) {
        if (inputArr[j][i] > 0) {
          b.push(inputArr[j]);
        } else {
          a.push(inputArr[j]);
        }
      }

      if (b.length >= a.length) {
        inputArr = type === "oxygen" ? b : a;
      } else {
        inputArr = type === "oxygen" ? a : b;
      }
    }

    //determine return value
    if (a.length > b.length) {
      return a[0];
    } else if (b.length > a.length) {
      return b[0];
    } else {
      if (type === "oxygen") {
        if (a[a.length - 1] == 1) {
          return a[0];
        } else {
          return b[0];
        }
      }
    }
  };

  const oxRating = parseInt(rating(input, "oxygen"), 2);
  const co2Rating = parseInt(rating(input, "co2"), 2);

  return oxRating * co2Rating;
};

lifeSupportRating(input);
