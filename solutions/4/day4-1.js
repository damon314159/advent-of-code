const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input.reduce(
  (sum, line) =>
    sum +
    (([wins, yours]) => {
      const winSet = new Set(wins.split(' ').filter((el) => el !== ''))
      return ((len) => (len ? 2 ** (len - 1) : 0))(yours.split(' ').filter((el) => winSet.has(el)).length)
    })(line.split(':')[1].split('|')),
  0
)

console.log(result)
