const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const getGrid = () => input.map((line) => line.split(""));

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
const getGridCell = (grid, { row, col }) => grid[row] && grid[row][col];
const setGridCell = (grid, { row, col }, value) => {
  grid[row][col] = value;
};
const findCharCoords = (grid, char) =>
  grid.flatMap((line, rowNum) =>
    line.reduce(
      (matches, cell, colNum) =>
        cell === char ? matches.concat({ row: rowNum, col: colNum }) : matches,
      [],
    ),
  );

const getKey = ({ row, col }) => `${row},${col}`;

// Begin a bfs to search for the path to the end
const bfs = (grid, startCoords, earlyExitThreshold = null) => {
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

    if (earlyExitThreshold && runningTotal > earlyExitThreshold) {
      // Prune paths that are too slow
      continue;
    }

    const currentCell = getGridCell(grid, coords);
    if (currentCell === "E") {
      // Lower the best path score, if this path is better
      minPath = Math.min(minPath, runningTotal);
      continue;
    }
    if (currentCell === "#") {
      // Stop when hitting a wall
      continue;
    }

    const key = getKey(coords);
    if (visited.has(key) && visited.get(key) < runningTotal) {
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

const baseGrid = getGrid();
const startCoords = findCharCoords(baseGrid, "S")[0];
const nonCheatingShortestPath = bfs(baseGrid, startCoords);
const walls = findCharCoords(baseGrid, "#");

const shortcuts = walls
  .filter(
    ({ row, col }) =>
      row > 0 &&
      col > 0 &&
      row < baseGrid.length - 1 &&
      col < baseGrid[0].length - 1,
  )
  .map((wallCoords) => {
    console.log(`searching ${getKey(wallCoords)}`);
    const grid = getGrid();
    setGridCell(grid, wallCoords, ".");
    return bfs(grid, startCoords, nonCheatingShortestPath - 100);
  })
  .filter((minPath) => minPath < Infinity).length;
console.log(shortcuts);
