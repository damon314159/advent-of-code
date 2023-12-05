const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = Math.min(
  ...input[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((seed) =>
      [
        input.slice(3, 21),
        input.slice(23, 31),
        input.slice(33, 68),
        input.slice(70, 115),
        input.slice(117, 131),
        input.slice(133, 161),
        input.slice(163)
      ]
        .map((lines) =>
          lines.map((line) => (([a, b, c]) => ({ start: +b, end: +b + +c, change: +a - +b }))(line.split(' ')))
        )
        .reduce(
          (current, mapSet) =>
            current +
            ((validRange) => (validRange.length ? validRange[0].change : 0))(
              mapSet.filter(({ start, end }) => start <= current && current < end)
            ),
          +seed
        )
    )
)

console.log(result)
