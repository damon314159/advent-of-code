const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split(" ");

// Solution

const add = (x, y) => x + y;

const memoise = (fn) => {
  const lookup = new Map();
  return (...args) => {
    const key = args.join(",");
    if (lookup.has(key)) return lookup.get(key);

    const res = fn(...args);
    lookup.set(key, res);
    return res;
  };
};

// Find what happens to a given stone according to the rules
const processStone = (stone) => {
  if (stone === 0) return [1];
  const stringified = stone.toString(10);
  if (stringified.length % 2 === 0)
    return [
      stringified.slice(0, stringified.length / 2),
      stringified.slice(stringified.length / 2),
    ].map(Number);
  return [stone * 2024];
};

// Find the number of stones spawned from a given stone after some number of iterations
const getStoneCount = memoise((stone, iterations) => {
  if (iterations === 1) {
    return processStone(stone).length; // Base case
  }
  return processStone(stone) // Find the new stones after one iteration
    .map((newStone) => getStoneCount(newStone, iterations - 1)) // Map them to their individual counts recursively
    .reduce(add, 0); // Add the counts
});

const startStones = input.map(Number);
const finalCount = startStones
  .map((stone) => getStoneCount(stone, 75))
  .reduce(add, 0);
console.log(finalCount);
