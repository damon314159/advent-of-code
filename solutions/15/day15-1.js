const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath)

// Solving time!
const result = input
  .split(',')
  .reduce(
    (sum, next) => sum + next.split('').reduce((sequence, char) => (17 * (sequence + char.charCodeAt(0))) % 256, 0),
    0
  )

console.log(result)
