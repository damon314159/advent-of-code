const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("\n");

console.time("Solution");
// Solution
const isSafe = (line) => {
  const levels = line.split(" ").map(Number);

  // Compare three pairs of levels to determine which direction the majority are moving
  const increasing =
    [
      levels[0] - levels[1],
      levels[1] - levels[2],
      levels[2] - levels[3],
    ].filter((diff) => diff > 0).length > 1;

  const getDifference = (arr, i) =>
    (increasing ? 1 : -1) * (arr[i] - arr[i + 1]);
  const isUnsafeDifference = (difference) => difference < 1 || difference > 3;

  // Go through levels pairwise, and stop when encountering a bad pair.
  // Delete either the first or second of that pair, and then parse again

  // There are inefficiencies here: Several pairs are compared more than once,
  // but it runs <10ms anyway on my machine, so I'm not motivated to optimise

  const safeIfDeleteFirst = (() => {
    let isDampened = false;
    const mutableLevels = levels.slice();
    for (let i = 0; i < mutableLevels.length - 1; i += 1) {
      const difference = getDifference(mutableLevels, i);
      if (isUnsafeDifference(difference)) {
        if (isDampened) return false;
        // Delete first half of bad pair, and reset the loop counter
        mutableLevels.splice(i, 1);
        isDampened = true;
        i = Math.max(-1, i - 2);
      }
    }
    return true;
  })();
  if (safeIfDeleteFirst) return true;

  const safeIfDeleteSecond = (() => {
    let isDampened = false;
    const mutableLevels = levels.slice();
    for (let i = 0; i < mutableLevels.length - 1; i += 1) {
      const difference = getDifference(mutableLevels, i);
      if (isUnsafeDifference(difference)) {
        if (isDampened) return false;
        // Delete second half of bad pair, and reset the loop counter
        mutableLevels.splice(i + 1, 1);
        isDampened = true;
        i = Math.max(-1, i - 2);
      }
    }
    return true;
  })();
  return safeIfDeleteSecond;
};

const safeties = input.map(isSafe);
const count = safeties.filter(Boolean).length;
console.log(count);
console.timeEnd("Solution");
