import { input } from "./puzzleInput.js";

const testInput = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const findTotalOutputs = (input) => {
  let count = 0;
  //sorted signals and outputs for each line
  const arr = input.split("\n").map((item) => {
    const [signals, outputs] = item.split(" | ").map((str) =>
      str.split(" ").map((x) => {
        const letters = [...x];
        letters.sort();
        return letters.join("");
      })
    );
    return { signals, outputs };
  });

  //need to compare by what's contained by value, not by substrings.
  // check if string b contains everything from string a.
  let includesAll = (a, b) => {
    const setA = new Set([...a]);
    return [...b].every((x) => setA.has(x));
  };

  for (const entry of arr) {
    //create an object to store found values, starting with 1, 4, 7, 8 (unique amount of values)
    const numbers = {
      1: entry.signals.find((x) => x.length === 2),
      4: entry.signals.find((x) => x.length === 4),
      7: entry.signals.find((x) => x.length === 3),
      8: entry.signals.find((x) => x.length === 7),
    };

    //value for 6 should not contain everything from 1 (where as 9 and 0 will)
    numbers[6] = entry.signals.find(
      (x) => x.length === 6 && !includesAll(x, numbers[1])
    );

    //value for 9 should contain everything from 4
    numbers[9] = entry.signals.find(
      (x) => x.length === 6 && includesAll(x, numbers[4])
    );

    //it's not 6 or 9, so much be 0
    numbers[0] = entry.signals.find(
      (x) => x.length === 6 && x !== numbers[6] && x !== numbers[9]
    );

    //value for 3 contains everything from 1 (where as 5 and 2 wouldn't)
    numbers[3] = entry.signals.find(
      (x) => x.length === 5 && includesAll(x, numbers[1])
    );

    //value for 6 contains everything for 5
    numbers[5] = entry.signals.find(
      (x) => x.length === 5 && x !== numbers[3] && includesAll(numbers[6], x)
    );

    //not 3 or 5 so much be 2
    numbers[2] = entry.signals.find(
      (x) => x.length === 5 && x !== numbers[3] && x !== numbers[5]
    );

    //take the object created and swap key value pairs
    const signalDictionary = Object.fromEntries(
      Object.entries(numbers).map((x) => x.reverse())
    );

    //map the outputs array from strings to their corresponding values, then add them to the count
    const theOutputVal = +entry.outputs
      .map((x) => signalDictionary[x])
      .join("");
    count += theOutputVal;
  }
  return count;
};

findTotalOutputs(input);
