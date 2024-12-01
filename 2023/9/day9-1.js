const fs = require('fs')
const path = require('path')
const interpolate = require('interpolating-polynomial')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input
  .map((line) => ((nums) => interpolate(nums.map((el, i) => [i, el]))(nums.length))(line.split(' ')))
  .reduce((a, c) => a + c)

console.log(result)
