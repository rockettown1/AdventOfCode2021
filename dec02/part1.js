import { input } from "./puzzleInput.js";

const calcPosition = (input) => {
  const cleanInput = input
    .split("\n")
    .map((cmd) => cmd.split(" "))
    .map((cmd) => ({ action: cmd[0], value: +cmd[1] }));

  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < cleanInput.length; i++) {
    switch (cleanInput[i].action) {
      case "forward":
        horizontal += cleanInput[i].value;
        break;
      case "up":
        depth -= cleanInput[i].value;
        break;
      case "down":
        depth += cleanInput[i].value;
        break;
    }
  }

  return horizontal * depth;
};

calcPosition(input);
