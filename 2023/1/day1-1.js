const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const calibrations = input.map((line) => line.replace(/\D/g, ''))
const total = calibrations.reduce((sum, line) => sum + +(line[0] + line.at(-1)), 0)
console.log(total)
