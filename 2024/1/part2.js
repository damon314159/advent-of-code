const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const firstList = input.map((line) => +line.split("   ")[0]);
const secondList = input.map((line) => +line.split("   ")[1]);

const countMatching = (arr, item) =>
  arr.filter((element) => element === item).length;

const similarityScore = firstList.reduce(
  (total, next) => total + next * countMatching(secondList, next),
  0,
);

console.log(similarityScore);
