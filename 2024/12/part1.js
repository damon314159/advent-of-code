const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
// Input parsing
const grid = input.map((row) => row.split(""));

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
const getCellKey = ({ row, col }) => `${row},${col}`;

// Region helpers
const sumRegions = (regions) =>
  regions.reduce(
    (total, { area, perimeter }) => ({
      area: total.area + area,
      perimeter: total.perimeter + perimeter,
    }),
    { area: 0, perimeter: 0 },
  );
const getFencePrice = (region) => region.area * region.perimeter;

// Maintain a global visited set, since each cell need only be explored once
const visited = new Set();

// Begin a recursive dfs to find the whole region
const dfs = (coords, plant = null) => {
  const key = getCellKey(coords);
  if (visited.has(key)) return { area: 0, perimeter: 0 }; // Already visited
  const cell = getGridCell(coords);
  if (plant && cell !== plant) return { area: 0, perimeter: 0 }; // Wrong plant type

  visited.add(key); // If it gets here, its total will be counted, so it is marked visited globally
  let thisCellsPeri = 4;
  // Get the contributions of each neighbour (and that neighbour's neighbours, recursively)
  const neighboursValues = directions.map((direction) => {
    const nextCoords = getNextCoords(coords, direction);
    if (getGridCell(nextCoords) === cell) thisCellsPeri -= 1; // Each neighbour of the same type reduces this cell's perimeter by 1
    return dfs(nextCoords, cell);
  });

  // Add together the neighbours' contributions, and the contribution of this cell
  return sumRegions(
    neighboursValues.concat({ area: 1, perimeter: thisCellsPeri }),
  );
};

// Perform solution
const allRegions = grid.flatMap((row, rowNum) =>
  row.map((_, colNum) => dfs({ row: rowNum, col: colNum })),
);
const allFencePrices = allRegions.map(getFencePrice);
const totalPrice = allFencePrices.reduce((total, next) => total + next, 0);

console.log(totalPrice);
