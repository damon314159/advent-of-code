const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const grid = input.map((line) => line.split(""));

const findCharCoords = (char) =>
  grid.flatMap((line, rowNum) =>
    line.reduce(
      (matches, cell, colNum) =>
        cell === char ? matches.concat({ row: rowNum, col: colNum }) : matches,
      [],
    ),
  );

const inRange = (coords) =>
  coords.row >= 0 &&
  coords.col >= 0 &&
  grid.length > coords.row &&
  grid[0].length > coords.col;

const fiftyToMinusFifty = Array.from({ length: 101 }, (_, i) => i - 51);

const antinodes = new Set();
grid.forEach((row, rowNum) => {
  row.forEach((cell, colNum) => {
    if (cell === ".") return;
    const otherLetterCoords = findCharCoords(cell);
    const coordDifferences = otherLetterCoords
      .map((otherLetter) => ({
        row: otherLetter.row - rowNum,
        col: otherLetter.col - colNum,
      }))
      .filter((diff) => diff.row !== 0 && diff.col !== 0);

    const foundAntinodes = coordDifferences
      .flatMap((diff) =>
        fiftyToMinusFifty.map((multiplier) => ({
          row: rowNum + multiplier * diff.row,
          col: colNum + multiplier * diff.col,
        })),
      )
      .filter(inRange);
    foundAntinodes.forEach((coords) => {
      antinodes.add(`${coords.row},${coords.col}`);
    });
  });
});

console.log(antinodes.size);
