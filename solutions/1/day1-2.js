const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const digits = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine'
}

function parseLine(str, reversed) {
  for (let i = 0; i < str.length; i += 1) {
    const char = str.at(reversed ? -1 - i : i)
    if (Number.isInteger(+char)) return char

    const subStr = reversed ? str.slice(str.length - i - 1) : str.slice(0, i + 1)
    for (let j = 0; j < 10; j += 1) {
      if (subStr.includes(digits[j])) return String(j)
    }
  }
  return 'oops'
}

const total = input.reduce((sum, line) => sum + +(parseLine(line, false) + parseLine(line, true)), 0)
console.log(total)
