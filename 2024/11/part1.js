const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split(" ");

// Solution
const startStones = input.map(Number);

const advanceState = (stones) =>
  stones.flatMap((stone) => {
    if (stone === 0) return 1;
    const stringified = stone.toString(10);
    if (stringified.length % 2 === 0)
      return [
        stringified.slice(0, stringified.length / 2),
        stringified.slice(stringified.length / 2),
      ].map(Number);
    return stone * 2024;
  });

const pipe = (fns) => (x) => fns.reduce((res, nextFn) => nextFn(res), x);

const advanceStateTimes = (n) =>
  pipe(Array.from({ length: n }, () => advanceState));

const finalStones = advanceStateTimes(25)(startStones);
console.log(finalStones.length);
