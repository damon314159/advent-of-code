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

// Begin a bfs to search for the path to the exit
const bfs = (startCoords) => {
  // Global tracking
  let minPath = Infinity;
  const visited = new Map();

  // Initialise queue
  const queue = [
    {
      coords: startCoords, // The current coords the search is checking
      runningTotal: 0, // How long it took to get here
    },
  ];

  while (queue.length > 0) {
    const { coords, runningTotal } = queue.shift();

    const currentCell = getGridCell(coords);
    if (!currentCell || currentCell === "#") {
      // Stop when hitting a wall or out of bounds
      continue;
    }
    if (coords.row === size - 1 && coords.col === size - 1) {
      // Found the exit, so lower the best path score if this path is better
      minPath = Math.min(minPath, runningTotal);
      continue;
    }

    const key = getKey(coords);
    if (visited.has(key) && visited.get(key) <= runningTotal) {
      continue; // If we've been here before, and the previous visit was shorter, stop
    }
    visited.set(key, runningTotal); // Else record how long it took us to get here

    // Enqueue possible moves from here
    queue.push(
      ...directions.map((direction) => ({
        coords: getNextCoords(coords, direction),
        runningTotal: runningTotal + 1,
      })),
    );
  }

  return minPath;
};

const dropByte = (coordsString) => {
  const [r, c] = coordsString.split(",").map(Number);
  grid[r][c] = "#";
};

for (let i = 0; i < 1024; i += 1) {
  dropByte(input[i]);
}

const minPath = bfs({ row: 0, col: 0 });
console.log(minPath);
