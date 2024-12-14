const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

// Solution
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((result, nextFn) => nextFn(result), x);
const vectorise = pipe(
  (fn) => ["x", "y"].map((axis) => [axis, fn(axis)]),
  Object.fromEntries,
);

const dimensions = { x: 101, y: 103 };

const parseRobot = (line) => {
  const [, px, py, vx, vy] = line.match(/p=(-?\d+),(-?\d+)\sv=(-?\d+),(-?\d+)/);
  return {
    coords: { x: +px, y: +py },
    velocity: { x: +vx, y: +vy },
  };
};

const getMod = (value, mod) => ((value % mod) + mod) % mod;
const getFinalPosition = (startCoords, velocity, time) =>
  vectorise((axis) =>
    getMod(startCoords[axis] + velocity[axis] * time, dimensions[axis]),
  );

const getGrid = (positions) => {
  const grid = Array.from({ length: dimensions.y }, () =>
    Array.from({ length: dimensions.x }, () => "."),
  );
  positions.forEach(({ x, y }) => {
    grid[y][x] = "#";
  });
  return grid.map((row) => row.join(""));
};

const print = (grid) => {
  grid.forEach((row) => console.log(row));
};

let found = false;
for (let i = 0; !found; i += 1) {
  const finalPositions = input.map(
    pipe(parseRobot, ({ coords, velocity }) =>
      getFinalPosition(coords, velocity, i),
    ),
  );
  const grid = getGrid(finalPositions);
  if (grid.some((row) => row.includes("##########"))) {
    found = true;
    print(grid);
    console.log("found at", i);
  }
}
