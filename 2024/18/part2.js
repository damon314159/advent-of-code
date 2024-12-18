const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const size = 71;
const grid = Array.from({ length: size }, () =>
  Array.from({ length: size }, () => "."),
);

// Grid helpers
const directions = [
  { row: 0, col: 1 }, // Right
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
  { row: -1, col: 0 }, // Up
];
const getNextCoords = ({ row, col }, direction) => ({
  row: row + direction.row,
  col: col + direction.col,
});
const getGridCell = ({ row, col }) => grid[row] && grid[row][col];

const getKey = ({ row, col }) => `${row},${col}`;

// Define a simple dfs to search for any path to the exit, returning true for found
const dfs = (coords, visited = new Set()) => {
  const currentCell = getGridCell(coords);
  if (!currentCell || currentCell === "#") {
    // Stop when hitting a wall or out of bounds
    return false;
  }
  if (coords.row === size - 1 && coords.col === size - 1) {
    // Found the exit
    return true;
  }

  const key = getKey(coords);
  if (visited.has(key)) {
    return false; // If we've been here before, stop
  }
  visited.add(key); // Else record that we've been here

  // Check recursively for any solution found by taking a step from this cell
  return directions.some((direction) =>
    dfs(getNextCoords(coords, direction), visited),
  );
};

const dropByte = (coordsString) => {
  const [r, c] = coordsString.split(",").map(Number);
  grid[r][c] = "#";
};

for (let i = 0; ; i += 1) {
  dropByte(input[i]);
  if (i < 1024) continue;
  const isPath = dfs({ row: 0, col: 0 });
  if (!isPath) {
    console.log(input[i]);
    break;
  }
}
