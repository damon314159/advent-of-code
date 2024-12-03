const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
const enabledSections = input
  // Separate input into sections fenced off by don't()
  .split("don't()")
  .map((section, i) =>
    // Anything before the first don't() is fine, and anything after a do() in each section is also fine
    i === 0 ? section : section.split("do()").slice(1).join(""),
  )
  .filter(Boolean);

// Find all matches from all sections
const matcher = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = enabledSections.flatMap((section) => [
  ...section.matchAll(matcher),
]);

const getMatchValue = ([, X, Y]) => +X * +Y;
const sum = matches.reduce((total, match) => total + getMatchValue(match), 0);

console.log(sum);
