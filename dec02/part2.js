import { input } from "./puzzleInput.js";
/* 
new conditions
In addition to horizontal and depth, also tracking third value: Aim 
down INCREASES aim, INCREASES depth
up DECREASES aim, DECREASES depth
forward INCREASES horizontal, INCREASES depth by (aim * X)
*/

const calcPosition = (input) => {
  const cleanInput = input
    .split("\n")
    .map((cmd) => cmd.split(" "))
    .map((cmd) => ({ action: cmd[0], value: +cmd[1] }));

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < cleanInput.length; i++) {
    const val = cleanInput[i].value;

    switch (cleanInput[i].action) {
      case "forward":
        horizontal += val;
        depth += aim * val;
        break;
      case "up":
        aim -= val;
        break;
      case "down":
        aim += val;
        break;
    }
  }
  return horizontal * depth;
};

calcPosition(input);
