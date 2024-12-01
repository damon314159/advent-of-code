const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input
  .map((line) =>
    (
      line
        .slice(0, 5)
        .split('')
        .sort()
        .join('')
        .replace(/(\w)\1{4}/, 'z')
        .replace(/(\w)\1{3}/, 'y')
        .replace(/(\w)\1{2}(\w)\2|(\w)\3(\w)\4{2}/, 'x')
        .replace(/(\w)\1{2}/, 'w')
        .replace(/(\w)\1\w?(\w)\2/, 'v')
        .replace(/(\w)\1/, 'u')
        .replace(/\w{5}/, 't')
        .replace(/[^t-z]/g, '') + line
    )
      .replace(/A/g, 'Z')
      .replace(/K/g, 'Y')
      .replace(/Q/g, 'X')
      .replace(/J/g, 'W')
      .replace(/T/g, 'V')
  )
  .sort()
  .reduce((sum, next, i) => sum + (i + 1) * next.split(' ')[1], 0)

console.log(result)
