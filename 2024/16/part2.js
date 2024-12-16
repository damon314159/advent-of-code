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

const getSeatKey = ({ row, col }) => `${row},${col}`;
const getVisitedKey = ({ row, col }, direction) => `${row},${col},${direction}`;

// Begin a bfs to search for the path to the exit
const bfs = (startCoords) => {
  // Global tracking
  let minPath = Infinity;
  let allSeats = new Set();
  const visited = new Map();

  // Initialise queue
  const queue = [
    {
      coords: startCoords, // The current coords the search is checking
      direction: 1, // Which direction the reindeer is facing
      runningTotal: 0, // How long it took to get here
      seats: new Set([getSeatKey(startCoords)]), // The seats explored up to this point
    },
  ];

  while (queue.length > 0) {
    const { coords, direction, runningTotal, seats } = queue.shift();

    const currentCell = getGridCell(coords);
    if (currentCell === "E") {
      // If this path is equally short, combine its seats with the existing ones
      if (runningTotal === minPath) {
        allSeats = new Set([...allSeats, ...seats]);
      }
      // If this path is the new shortest, then replace the existing seats with these
      if (runningTotal < minPath) {
        minPath = runningTotal;
        allSeats = seats;
      }
      // Add the finish line seat
      allSeats.add(getSeatKey(coords));
      continue;
    }
    if (currentCell === "#") {
      // Stop when hitting a wall
      continue;
    }

    const visitedKey = getVisitedKey(coords, direction);
    if (visited.has(visitedKey) && visited.get(visitedKey) < runningTotal) {
      continue; // If we've been here before, and the previous visit was shorter, stop
    }
    visited.set(visitedKey, runningTotal); // Else record how long it took us to get here
    const newSeats = new Set(seats).add(getSeatKey(coords));

    // Enqueue possible moves from here
    queue.push(
      {
        // Forwards
        coords: getNextCoords(coords, directions[direction]),
        direction,
        runningTotal: runningTotal + 1,
        seats: newSeats,
      },
      {
        // Turn right
        coords,
        direction: (direction + 1) % 4,
        runningTotal: runningTotal + 1000,
        seats: newSeats,
      },
      {
        // Turn left
        coords,
        direction: (direction + 3) % 4,
        runningTotal: runningTotal + 1000,
        seats: newSeats,
      },
    );
  }

  return { minPath, seatsCount: allSeats.size };
};

console.time("solve");
const startCoords = findCharCoords("S")[0];
const { minPath, seatsCount } = bfs(startCoords);
console.log({ minPath, seatsCount });
console.timeEnd("solve");
