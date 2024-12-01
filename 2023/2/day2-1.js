const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const limits = { red: 12, green: 13, blue: 14 }
const result = input.reduce((sum, line) => {
  const games = line.split(':')[1].split(';')
  return games.every((game) => {
    const cubes = game.split(',')
    return !cubes.some((val) => {
      const [, num, colour] = val.split(' ')
      return +num > limits[colour]
    })
  })
    ? sum + +line.split(':')[0].slice(5)
    : sum
}, 0)

console.log(result)
