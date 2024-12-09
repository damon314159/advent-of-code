const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim().split("");

// Solution
const getDuplicates = (item, count) =>
  Array.from({ length: count }, () => item);

// Build an array to represent each block in the disk
const disk = input.flatMap((blockCount, i) =>
  getDuplicates(i % 2 ? "." : i / 2, blockCount),
);

// Helpers
const swapBlocks = (left, right) => {
  [disk[left], disk[right]] = [disk[right], disk[left]];
};

// Set up two pointers to track which blocks we're moving
let leftPointer = disk.indexOf(".");
let rightPointer = disk.findLastIndex((block) => block !== ".");
const fileBlockCount = disk.filter((block) => block !== ".").length;

// While the left pointer is less than the number of file blocks, there are still gaps to fill
while (leftPointer < fileBlockCount) {
  // Move pointers closer until they have found a file to move and gap to place it in
  if (disk[leftPointer] !== ".") {
    leftPointer += 1;
    continue;
  }
  if (disk[rightPointer] === ".") {
    rightPointer -= 1;
    continue;
  }
  // Then swap those blocks
  swapBlocks(leftPointer, rightPointer);
}

// Count checksum
const checksum = disk.reduce(
  (total, nextId, i) => total + (nextId === "." ? 0 : nextId * i),
  0,
);
console.log(checksum);
