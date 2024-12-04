const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const aCoords = input.flatMap((line, rowNum) =>
  [...line.matchAll("A")].map((match) => ({ row: rowNum, col: match.index })),
);

const offsetPairs = [
  [
    { row: -1, col: -1 }, // Top left, and
    { row: 1, col: 1 }, // Bottom right
  ],
  [
    { row: -1, col: 1 }, // Top right, and
    { row: 1, col: -1 }, // Bottom left
  ],
];
const getOffsetLetter = (coords, offset) =>
  input[coords.row + offset.row]?.[coords.col + offset.col];

const isX_Mas = (coords) =>
  offsetPairs.every((offsetPair) => {
    const letterPair = offsetPair.map((offset) =>
      getOffsetLetter(coords, offset),
    );
    return letterPair.includes("M") && letterPair.includes("S");
  });

const totalCount = aCoords.map(isX_Mas).filter(Boolean).length;
console.log(totalCount);
