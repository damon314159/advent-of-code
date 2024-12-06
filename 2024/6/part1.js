const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const grid = input.map((row) => row.split(""));

const startRow = input.findIndex((row) => row.includes("^"));
const startCol = input[startRow].indexOf("^");

const offsets = [
  { row: -1, col: 0 }, // Up -- direction 0
  { row: 0, col: 1 }, // Right -- direction 1
  { row: 1, col: 0 }, // Down -- direction 2
  { row: 0, col: -1 }, // Left -- direction 3
];
const getOffsetChar = (coords, offset) =>
  grid[coords.row + offset.row]?.[coords.col + offset.col];
const replaceCell = (coords, value) => {
  grid[coords.row][coords.col] = value;
};

const guard = { coords: { row: startRow, col: startCol }, direction: 0 };

const move = () => {
  const facing = getOffsetChar(guard.coords, offsets[guard.direction]);
  if (!facing) {
    return false; // No move available, leaving grid
  }
  if (facing === "#") {
    guard.direction = (guard.direction + 1) % 4;
    return move();
  }
  guard.coords.row += offsets[guard.direction].row;
  guard.coords.col += offsets[guard.direction].col;
  return true; // Move made
};

replaceCell(guard.coords, "X");
while (move()) {
  replaceCell(guard.coords, "X");
}

const cellsVisited = grid
  .map((row) => row.filter((cell) => cell === "X").length)
  .reduce((total, next) => total + next, 0);

console.log(cellsVisited);
