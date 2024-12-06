const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const isSafe = (line) => {
  const values = line.split(" ").map(Number);
  if (values[0] === values[1]) return false;
  const increasing = values[0] > values[1];
  for (let i = 0; i < values.length - 1; i += 1) {
    const difference = (increasing ? 1 : -1) * (values[i] - values[i + 1]);
    if (difference < 1 || difference > 3) {
      return false;
    }
  }
  return true;
};

const safeties = input.map(isSafe);
const count = safeties.filter(Boolean).length;
console.log(count);
