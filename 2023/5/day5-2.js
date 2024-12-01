const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const find = (seed) =>
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

// Wide sieve to get a ballpark, skipping 10k values per try
let roughMin = Infinity
let roughJ = null
input[0]
  .split(':')[1]
  .trim()
  .split(' ')
  .forEach((next, i, vals) => {
    if (!(i % 2)) {
      for (let j = +next; j < +next + +vals[i + 1]; j += 10000) {
        const location = find(j)
        if (location < roughMin) {
          roughMin = location
          roughJ = j
        }
      }
    }
  })

// Fine sieve around the smallest of those, to find the actual smallest
let result = Infinity
for (let j = roughJ - 10000; j < roughJ + 10000; j += 1) {
  const location = find(j)
  if (location < result) {
    result = location
  }
}

console.log(result)
