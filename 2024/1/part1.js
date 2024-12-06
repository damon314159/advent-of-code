const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const firstList = input.map((line) => +line.split("   ")[0]).sort();
const secondList = input.map((line) => +line.split("   ")[1]).sort();

const difference = firstList.reduce(
  (total, next, i) => total + Math.abs(next - secondList[i]),
  0,
);
console.log(difference);
