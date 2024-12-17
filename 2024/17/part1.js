/* eslint-disable no-bitwise */ // This is a bitwise challenge lol
const fs = require("fs");
const path = require("path");

// Read data
const inputPath = path.join(__dirname, "data.txt");
const readFile = (p) => fs.readFileSync(p, { encoding: "utf8" });
const input = readFile(inputPath).trim();

// Solution
// Input parsing
const [registers, programString] = input.split("\n\n");
let [regA, regB, regC] = registers
  .split("\n")
  .map((line) => line.split(": ")[1])
  .map(Number);
const program = programString.split(": ")[1].split(",").map(Number);

let pc = 0; // Program counter

const getLiteralOperand = (operand) => operand;
const getComboOperand = (operand) => {
  if (operand < 4) return operand;
  if (operand === 4) return regA;
  if (operand === 5) return regB;
  if (operand === 6) return regC;
  throw new Error("Reserved keyword 0b111 misused");
};

const out = [];
const performOp = (opcode, operand) => {
  switch (opcode) {
    case 0:
      regA = Math.floor(regA / 2 ** getComboOperand(operand));
      break;
    case 1:
      regB ^= getLiteralOperand(operand);
      break;
    case 2:
      regB = getComboOperand(operand) & 0b111;
      break;
    case 3:
      if (regA === 0) break;
      pc = getLiteralOperand(operand);
      return;
    case 4:
      regB ^= regC;
      break;
    case 5:
      out.push(getComboOperand(operand) & 0b111);
      break;
    case 6:
      regB = Math.floor(regA / 2 ** getComboOperand(operand));
      break;
    case 7:
      regC = Math.floor(regA / 2 ** getComboOperand(operand));
      break;
    default:
      throw new Error("Invalid opcode");
  }
  pc += 2;
};

while (pc >= 0 && pc < program.length) {
  performOp(program[pc], program[pc + 1]);
}

console.log(out.join(","));
