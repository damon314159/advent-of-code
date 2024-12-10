const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
// Input parsing
const grid = input.map((row) => row.split("").map(Number));
// Find all 0s as the start of trails in the map
const allTrailheads = grid.flatMap((line, rowNum) =>
  line.reduce(
    (matches, cell, colNum) =>
      cell === 0 ? matches.concat({ row: rowNum, col: colNum }) : matches,
    [],
  ),
);

const directions = [
  { row: -1, col: 0 }, // Up
  { row: 0, col: 1 }, // Right
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
];
const getNextCoords = ({ row, col }, direction) => ({
  nextCoords: { row: row + direction.row, col: col + direction.col }, // Coords to work with
  stringified: `${row + direction.row},${col + direction.col}`, // Stringified for tracking visited nodes
});
const getGridCell = ({ row, col }) => grid[row]?.[col];

const count = (arr) => arr.reduce((total, next) => total + next, 0);

// Begin a recursive dfs to search for the path to a 9
const dfs = (coords, currentNum = 0, visited = []) => {
  if (currentNum === 9) return 1; // Base case
  return count(
    directions.map((direction) => {
      const { nextCoords, stringified } = getNextCoords(coords, direction);
      if (getGridCell(nextCoords) !== currentNum + 1) {
        return 0; // This path isn't correct
      }
      if (visited.includes(stringified)) {
        return 0; // Square already visited during this dfs
      }
      visited.push(stringified);
      return dfs(nextCoords, currentNum + 1, visited); // Recursive step
    }),
  );
};
// This looks useless but is required to not pass the optional args when mapping
const getScore = (coords) => dfs(coords);

// Perform solution
const scores = allTrailheads.map(getScore);
const totalScore = count(scores);
console.log(totalScore);
