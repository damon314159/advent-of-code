const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const operations = [(x, y) => x + y, (x, y) => x * y, (x, y) => +`${x}${y}`];

const test = (total, numbers, runningTotal = null) => {
  // Base case
  if (numbers.length === 0) {
    return runningTotal === total;
  }

  // If running total is too high, return false since all operators make number bigger
  if (runningTotal !== null && runningTotal > total) {
    return false;
  }

  // First call has no running total, so combines two elements
  if (runningTotal === null) {
    return operations.some((op) =>
      test(total, numbers.slice(2), op(numbers[0], numbers[1])),
    );
  }

  // Subsequent calls work on the left-to-right running total
  return operations.some((op) =>
    test(total, numbers.slice(1), op(runningTotal, numbers[0])),
  );
};

// Parse input
const equations = input.map((line) => [
  +line.split(": ")[0],
  line.split(": ")[1].split(" ").map(Number),
]);

// Test input equations
const validEquations = equations.filter(([calibration, numbers]) =>
  test(calibration, numbers),
);
const result = validEquations.reduce(
  (total, [calibration]) => total + calibration,
  0,
);
console.log(result);
