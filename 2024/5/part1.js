const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
const [rulesRaw, updatesRaw] = input.split("\n\n");
const rules = rulesRaw.split("\n");
const updates = updatesRaw.split("\n").map((update) => update.split(","));

const edges = new Map();
rules
  .map((rule) => rule.split("|"))
  .forEach(([before, after]) => {
    if (edges.has(before)) {
      edges.get(before).push(after);
      return;
    }
    edges.set(before, [after]);
  });

const isUpdateValid = (update) =>
  update.every((value, i) => {
    if (!edges.has(value)) {
      return true;
    }
    const afters = edges.get(value);
    return update
      .slice(0, i)
      .every((beforeValue) => !afters.includes(beforeValue));
  });

const getUpdateMiddle = (update) => {
  const midpoint = Math.floor(update.length / 2);
  return +update[midpoint];
};

const pageNumbers = updates.filter(isUpdateValid).map(getUpdateMiddle);
const total = pageNumbers.reduce((sum, number) => sum + number, 0);
console.log(total);
