const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("");

// Solution
console.time("solve");
const getDuplicates = (item, count) =>
  Array.from({ length: count }, () => item);

// Build an array to represent each block in the disk
const disk = input.flatMap((blockCount, i) =>
  getDuplicates(i % 2 ? "." : i / 2, blockCount),
);

// Helpers
const swapBlocksOfSize = (size) => (left, right) => {
  for (let i = 0; i < size; i += 1) {
    [disk[left + i], disk[right - i]] = [disk[right - i], disk[left + i]];
  }
};
const countRun = (index, backwards = false) => {
  const block = disk[index];
  let count = 0;
  for (let i = index; disk[i] === block; i += backwards ? -1 : 1) {
    count += 1;
  }
  return count;
};

// Loop over all file IDs in descending order
const highestId = disk.findLast((block) => block !== ".");
for (let idToMove = highestId; idToMove >= 0; idToMove -= 1) {
  // Find file details
  const fileEnd = disk.lastIndexOf(idToMove);
  const fileSize = countRun(fileEnd, true);

  // Find all gaps that exist before this file
  const gaps = [];
  for (let i = 0; i < fileEnd; i += 1) {
    if (disk[i] === ".") {
      const gapLength = countRun(i);
      gaps.push({ start: i, length: gapLength });
      i += gapLength - 1; // Skip the rest of this gap
    }
  }

  // If a gap is big enough, move the file into it
  const bigEnoughGap = gaps.find((gap) => gap.length >= fileSize);
  if (bigEnoughGap) {
    swapBlocksOfSize(fileSize)(bigEnoughGap.start, fileEnd);
  }
}

// Count checksum
const checksum = disk.reduce(
  (total, nextId, i) => total + (nextId === "." ? 0 : nextId * i),
  0,
);
console.log(checksum);
console.timeEnd("solve");
