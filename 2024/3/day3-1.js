const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
const matcher = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = [...input.matchAll(matcher)];

const getMatchValue = ([, X, Y]) => +X * +Y;
const sum = matches.reduce((total, match) => total + getMatchValue(match), 0);
console.log(sum);
