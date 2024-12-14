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
const midpoints = vectorise((axis) => Math.floor(dimensions[axis] / 2));

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

const getQuadrant = (coords) => {
  if (coords.x === midpoints.x || coords.y === midpoints.y) return null;
  if (coords.y < midpoints.y) {
    if (coords.x < midpoints.x) return 0;
    return 1;
  }
  if (coords.x > midpoints.x) return 2;
  return 3;
};

const finalQuadrants = input.map(
  pipe(
    parseRobot,
    ({ coords, velocity }) => getFinalPosition(coords, velocity, 100),
    getQuadrant,
  ),
);

const quadrantTotals = finalQuadrants.reduce(
  (quadrants, quadrant) => {
    if (quadrant !== null) {
      quadrants[quadrant] += 1;
    }
    return quadrants;
  },
  [0, 0, 0, 0],
);
const safetyFactor = quadrantTotals.reduce(
  (product, quadrant) => product * quadrant,
  1,
);
console.log(safetyFactor);
