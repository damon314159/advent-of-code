const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n\n");

// Solution

// Solve for two linear diophantine's simultaneously.
/*
  [[a,  b],  * [n,  =  [x,
   [c,  d]]     m]      y]
 */
// This system can be solved by inverting the 2x2 matrix
/*
  [[d,  -b],  * [x,  =  [n,  *  discriminant
   [-c,  a]]     y]      m]
 */
const solve = ([[a, b], [c, d]], [x, y]) => {
  const discriminant = a * d - b * c;
  // Not invertible if discriminant is 0
  if (discriminant === 0) return null;
  const n = (d * x - b * y) / discriminant;
  const m = (-c * x + a * y) / discriminant;
  // Only integer solutions are considered
  if ([n, m].some((num) => !Number.isInteger(num))) return null;
  return [n, m];
};

// Finds cost of the moves made
const getTokens = (n, m) => 3 * n + m;

const parseMachine = (machine) => {
  const lines = machine.split("\n");
  const [, a, c] = lines[0].match(/X\+(\d+), Y\+(\d+)/);
  const [, b, d] = lines[1].match(/X\+(\d+), Y\+(\d+)/);
  const [, x, y] = lines[2].match(/X=(\d+), Y=(\d+)/);
  return [
    [
      [a, b],
      [c, d],
    ].map((nums) => nums.map(Number)), // I should implement a deep map
    [x, y].map(Number),
  ];
};

// Adjust for the conversion error given
const add = (x) => (y) => x + y;
const fixConversionError = ([[a, b], [c, d]], [x, y]) => [
  [
    [a, b],
    [c, d],
  ],
  [x, y].map(add(10000000000000)),
];

const spreadable = (fn) => (argArray) => fn(...argArray);

const total = input
  .map(parseMachine)
  .map(spreadable(fixConversionError))
  .map(spreadable(solve))
  .map((solution) => (solution ? spreadable(getTokens)(solution) : 0))
  .reduce((sum, next) => sum + next, 0);

console.log(total);
