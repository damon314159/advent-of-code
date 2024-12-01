const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const total = input.reduce((sum, line) => {
  const max = { red: 0, green: 0, blue: 0 }
  const games = line.split(':')[1].split(';')
  games.forEach((game) => {
    const cubes = game.split(',')
    cubes.forEach((val) => {
      const [, num, colour] = val.split(' ')
      if (+num > max[colour]) max[colour] = +num
    })
  })
  return sum + Object.values(max).reduce((product, next) => product * next, 1)
}, 0)

console.log(total)
