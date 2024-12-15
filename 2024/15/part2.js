const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
// Input parsing
const [map, instructions] = input.split("\n\n");
const grid = map.split("\n").map((line) =>
  line
    .split("")
    .map((char) => {
      if (char === "#") return "##";
      if (char === "O") return "[]";
      if (char === ".") return "..";
      return "@.";
    })
    .flatMap((chars) => chars.split("")),
);
const moves = instructions.replace(/\n/g, "").split("");

// Grid helpers
const directions = {
  "^": { row: -1, col: 0 }, // Up
  ">": { row: 0, col: 1 }, // Right
  v: { row: 1, col: 0 }, // Down
  "<": { row: 0, col: -1 }, // Left
};
const getNextCoords = ({ row, col }, direction) => ({
  row: row + directions[direction].row,
  col: col + directions[direction].col,
});
const getGridCell = ({ row, col }) => grid[row] && grid[row][col];
const swapCells = ({ row: rowA, col: colA }, { row: rowB, col: colB }) => {
  [grid[rowA][colA], grid[rowB][colB]] = [grid[rowB][colB], grid[rowA][colA]];
};
const findCharCoords = (char) =>
  grid.flatMap((line, rowNum) =>
    line.reduce(
      (matches, cell, colNum) =>
        cell === char ? matches.concat({ row: rowNum, col: colNum }) : matches,
      [],
    ),
  );

// Test recursively whether this line can be pushed in the direction specified
const checkPushPossible = (coords, direction) => {
  const nextCoords = getNextCoords(coords, direction);
  const nextCell = getGridCell(nextCoords);
  if (nextCell === "#") {
    return false;
  }
  if (nextCell === ".") {
    return true;
  }
  if (direction === "<" || direction === ">") {
    return checkPushPossible(nextCoords, direction);
  }
  // When checking a [ or ] vertically, check the neighbouring columns too
  return (
    checkPushPossible(nextCoords, direction) &&
    checkPushPossible(
      {
        row: nextCoords.row,
        col: nextCoords.col + (nextCell === "[" ? 1 : -1),
      },
      direction,
    )
  );
};

// Perform the push itself as a series of swaps recursively
const push = (coords, direction) => {
  const nextCoords = getNextCoords(coords, direction);
  const nextCell = getGridCell(nextCoords);
  if (nextCell === ".") {
    // Base case to end the sequence of swaps
    swapCells(coords, nextCoords);
    return;
  }
  // Check whether the push is possible before attempting anything
  if (!checkPushPossible(coords, direction)) {
    return;
  }
  // If horizontal, we have the simple case from part 1
  if (direction === "<" || direction === ">") {
    push(nextCoords, direction);
    swapCells(coords, nextCoords);
    return;
  }
  // Push this column and the one next to it
  push(nextCoords, direction);
  push(
    { row: nextCoords.row, col: nextCoords.col + (nextCell === "[" ? 1 : -1) },
    direction,
  );
  // Move the current cell into the gap left by pushing the rest of the line
  swapCells(coords, nextCoords);
};

// Calculate score as described in the problem
const getBoxScore = ({ row, col }) => row * 100 + col;

// Have the robot perform all the moves
moves.forEach((move) => {
  const robotCoords = findCharCoords("@")[0];
  push(robotCoords, move);
});

// Get the total score
const score = findCharCoords("[")
  .map(getBoxScore)
  .reduce((total, next) => total + next, 0);
console.log(score);
