const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
// Input parsing
const grid = input.map((row) => row.split(""));

const orthogonals = [
  { row: -1, col: 0 }, // Up
  { row: 0, col: 1 }, // Right
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
];
const diagonals = [
  { row: -1, col: -1 }, // Up/Left
  { row: -1, col: 1 }, // Up/Right
  { row: 1, col: 1 }, // Down/Right
  { row: 1, col: -1 }, // Down/Left
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

// Calculate a particular cells contribution to the perimeter of the region, based on the visited cells in the 3x3 around it
const getCellPerimeterContribution = (coords, cell) => {
  // Find which of the cells in the surrounding 3x3 are both visited and of the same plant type
  const [visitedNeighbours, visitedDiagonals] = [orthogonals, diagonals].map(
    (directionSet) =>
      directionSet.map((direction) => {
        const nextCoords = getNextCoords(coords, direction);
        const nextCell = getGridCell(nextCoords);
        const key = getCellKey(nextCoords);
        return visited.has(key) && cell === nextCell;
      }),
  );
  const neighbourCount = visitedNeighbours.filter(Boolean).length;
  const diagonalCount = visitedDiagonals.filter(Boolean).length;

  // I worked out on paper that there are 33 distinct cases, accounting for symmetries
  // You can calculate the diff that this cell contributes to the number of edges for each case. See photo in repo for workings
  // So here's an enormous block of logic that distinguishes the diff based on the cases. Cases are grouped where possible
  if (neighbourCount === 0) return 4;
  if (neighbourCount === 1) {
    const neighbourIndex = visitedNeighbours.indexOf(true);
    const cornerCount = [
      visitedDiagonals[neighbourIndex],
      visitedDiagonals[(neighbourIndex + 1) % 4],
    ].filter(Boolean).length;
    if (cornerCount === 0) return 0;
    if (cornerCount === 1) return 2;
    return 4;
  }
  if (neighbourCount === 2) {
    const neighbourIndexA = visitedNeighbours.indexOf(true);
    const neighbourIndexB = visitedNeighbours.lastIndexOf(true);
    const areAdjacent = neighbourIndexB - neighbourIndexA !== 2;
    if (areAdjacent) {
      const firstCornerIndex =
        (neighbourIndexA + 1) % 4 === neighbourIndexB
          ? neighbourIndexA
          : neighbourIndexB;
      const corners = [
        visitedDiagonals[firstCornerIndex],
        visitedDiagonals[(firstCornerIndex + 1) % 4],
        visitedDiagonals[(firstCornerIndex + 2) % 4],
      ];
      const cornerCount = corners.filter(Boolean).length;
      if (cornerCount === 0) return -2;
      if (cornerCount === 1) return corners[1] ? -2 : 0;
      if (cornerCount === 2) return corners[1] ? 0 : 2;
      return 2;
    }
    if (diagonalCount === 0) return -4;
    if (diagonalCount === 1) return -2;
    if (diagonalCount === 2) return 0;
    if (diagonalCount === 3) return 2;
    return 4;
  }
  if (neighbourCount === 3) {
    const missingNeighbourIndex = visitedNeighbours.indexOf(false);
    const corners = [
      visitedDiagonals[(missingNeighbourIndex + 2) % 4],
      visitedDiagonals[(missingNeighbourIndex + 3) % 4],
      visitedDiagonals[missingNeighbourIndex],
      visitedDiagonals[(missingNeighbourIndex + 1) % 4],
    ];
    if (diagonalCount === 0) return -4;
    if (diagonalCount === 1) {
      if (corners[0] || corners[1]) return -4;
      return -2;
    }
    if (diagonalCount === 2) {
      if (corners[0] && corners[1]) return -4;
      if (corners[2] && corners[3]) return 0;
      return -2;
    }
    if (diagonalCount === 3) {
      if (!corners[0] || !corners[1]) return 0;
      return -2;
    }
    return 0;
  }
  return -4;
};

// Begin a recursive dfs to find the whole region
const dfs = (coords, plant = null) => {
  const key = getCellKey(coords);
  if (visited.has(key)) return { area: 0, perimeter: 0 }; // Already visited
  const cell = getGridCell(coords);
  if (plant && cell !== plant) return { area: 0, perimeter: 0 }; // Wrong plant type

  visited.add(key); // If it gets here, its total will be counted, so it is marked visited globally
  const thisCellsPeri = getCellPerimeterContribution(coords, cell);

  // Get the contributions of each neighbour (and that neighbour's neighbours, recursively)
  const neighboursValues = orthogonals.map((direction) => {
    const nextCoords = getNextCoords(coords, direction);
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
