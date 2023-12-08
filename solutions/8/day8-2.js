const math = require('mathjs')
const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const map = new Map(
  input.slice(2).map((line) => [
    line.slice(0, 3),
    new Map([
      ['L', line.slice(7, 10)],
      ['R', line.slice(12, 15)]
    ])
  ])
)
const result = math.lcm(
  ...input
    .slice(2)
    .filter((line) => line[2] === 'A')
    .map((line) => line.slice(0, 3))
    .map((node) => {
      let i
      for (i = 0; node[2] !== 'Z'; i += 1) {
        node = map.get(node).get(input[0][i % input[0].length])
      }
      return i
    })
)

console.log(result)
