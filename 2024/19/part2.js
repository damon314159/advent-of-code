const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
// Input parsing
const [allTowels, allPatterns] = input.split("\n\n");
const towels = allTowels.split(", ");
const patterns = allPatterns.split("\n");

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

const add = (x, y) => x + y;

// Construct a dfs to try all combinations of patterns to make a given target
const dfs = memoise((remainingPattern) => {
  // Base case
  if (remainingPattern === "") return 1;

  // Add one more towel to the mix recursively
  return towels
    .map((towel) =>
      remainingPattern.startsWith(towel)
        ? dfs(remainingPattern.slice(towel.length))
        : 0,
    )
    .reduce(add, 0);
});

const validPatternCounts = patterns.map(dfs);
const total = validPatternCounts.reduce(add, 0);
console.log(total);
