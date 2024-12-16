const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const grid = input.map((row) => row.split(""));

// Grid helpers
const directions = [
  { row: -1, col: 0 }, // Up
  { row: 0, col: 1 }, // Right
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
];
const getNextCoords = ({ row, col }, direction) => ({
  row: row + direction.row,
  col: col + direction.col,
});
const getGridCell = ({ row, col }) => grid[row] && grid[row][col];
const findCharCoords = (char) =>
  grid.flatMap((line, rowNum) =>
    line.reduce(
      (matches, cell, colNum) =>
        cell === char ? matches.concat({ row: rowNum, col: colNum }) : matches,
      [],
    ),
  );

const getKey = ({ row, col }, direction) => `${row},${col},${direction}`;

// Begin a bfs to search for the path to the exit
const bfs = (startCoords) => {
  // Global tracking
  let minPath = Infinity;
  const visited = new Map();

  // Initialise queue
  const queue = [
    {
      coords: startCoords, // The current coords the search is checking
      direction: 1, // Which direction the reindeer is facing
      runningTotal: 0, // How long it took to get here
    },
  ];

  while (queue.length > 0) {
    const { coords, direction, runningTotal } = queue.shift();

    const currentCell = getGridCell(coords);
    if (currentCell === "E") {
      // Lower the best path score, if this path is better
      minPath = Math.min(minPath, runningTotal);
      continue;
    }
    if (currentCell === "#") {
      // Stop when hitting a wall
      continue;
    }

    const key = getKey(coords, direction);
    if (visited.has(key) && visited.get(key) <= runningTotal) {
      continue; // If we've been here before, and the previous visit was shorter, stop
    }
    visited.set(key, runningTotal); // Else record how long it took us to get here

    // Enqueue possible moves from here
    queue.push(
      {
        // Forwards
        coords: getNextCoords(coords, directions[direction]),
        direction,
        runningTotal: runningTotal + 1,
      },
      {
        // Turn right
        coords,
        direction: (direction + 1) % 4,
        runningTotal: runningTotal + 1000,
      },
      {
        // Turn left
        coords,
        direction: (direction + 3) % 4,
        runningTotal: runningTotal + 1000,
      },
    );
  }

  return minPath;
};

console.time("solve");
const startCoords = findCharCoords("S")[0];
const minPath = bfs(startCoords);
console.log(minPath);
console.timeEnd("solve");
