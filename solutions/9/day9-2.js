const fs = require('fs')
const path = require('path')
const interpolate = require('interpolating-polynomial')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input.map((line) => interpolate(line.split(' ').map((el, i) => [i, el]))(-1)).reduce((a, c) => a + c)

console.log(result)
