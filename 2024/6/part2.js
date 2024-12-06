const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const startRow = input.findIndex((row) => row.includes("^"));
const startCol = input[startRow].indexOf("^");
const getGrid = () => input.map((row) => row.split(""));
const getGuard = () => ({
  coords: { row: startRow, col: startCol },
  direction: 0,
});

const offsets = [
  { row: -1, col: 0 }, // Up -- direction 0
  { row: 0, col: 1 }, // Right -- direction 1
  { row: 1, col: 0 }, // Down -- direction 2
  { row: 0, col: -1 }, // Left -- direction 3
];
const getOffsetChar = (grid, coords, offset) =>
  grid[coords.row + offset.row]?.[coords.col + offset.col];
const replaceCell = (grid, coords, value) => {
  grid[coords.row][coords.col] = value;
};

const move = (guard, grid) => {
  const facing = getOffsetChar(grid, guard.coords, offsets[guard.direction]);
  // Facing the outer border of the grid
  if (!facing) {
    return 0; // No move available, leaving grid
  }
  // Facing an obstacle
  if (facing === "#") {
    guard.direction = (guard.direction + 1) % 4;
    return move(guard, grid);
  }
  // Have we visited this cell, while facing the same way?
  if (grid[guard.coords.row][guard.coords.col] === guard.direction.toString()) {
    return 1; // Loop found
  }
  // Else mark where we are facing and move the guard
  replaceCell(grid, guard.coords, guard.direction.toString());
  guard.coords.row += offsets[guard.direction].row;
  guard.coords.col += offsets[guard.direction].col;
  return 2; // Move made
};

console.time("brute force lol");
let validCount = 0;
for (let r = 0; r < input.length; r += 1) {
  for (let c = 0; c < input[0].length; c += 1) {
    console.log(
      `row/col (${r}, ${c}) out of total (${input.length - 1}, ${input[0].length - 1})`,
    );
    if (r === startRow && c === startCol) {
      continue; // Can't place obstacle at start square
    }
    // Instantiate a new guard and grid
    const grid = getGrid();
    const guard = getGuard();
    // Place an obstacle at (r, c)
    replaceCell(grid, { row: r, col: c }, "#");
    // Begin moving the guard, until they leave the grid, or find a loop
    while (true) {
      const action = move(guard, grid);
      if (action === 0) break; // Leaving grid with no loop
      if (action === 1) {
        validCount += 1; // Loop found
        break;
      }
    }
  }
}
console.log(validCount);
console.timeEnd("brute force lol");
