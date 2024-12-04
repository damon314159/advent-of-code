const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const xCoords = input.flatMap((line, rowNum) =>
  [...line.matchAll("X")].map((match) => ({ row: rowNum, col: match.index })),
);

const offsets = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];
const getOffsetLetter = (coords, offset, multiplier) =>
  input[coords.row + multiplier * offset.row]?.[
    coords.col + multiplier * offset.col
  ];

const countXmasesFrom = (coords) =>
  offsets.filter((offset) =>
    ["M", "A", "S"].every(
      (letter, i) => getOffsetLetter(coords, offset, i + 1) === letter,
    ),
  ).length;

const totalCount = xCoords
  .map(countXmasesFrom)
  .reduce((total, next) => total + next, 0);
console.log(totalCount);
