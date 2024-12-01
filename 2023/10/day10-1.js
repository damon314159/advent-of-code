const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
function getByValue(map, search) {
  for (const [key, value] of map.entries()) {
    if (value === search) return key.split(',').map((str) => +str)
  }
}

function otherSide(map, [r, c], symbol) {
  return (
    {
      J: [
        [r - 1, c],
        [r, c - 1]
      ],
      7: [
        [r, c - 1],
        [r + 1, c]
      ],
      F: [
        [r, c + 1],
        [r + 1, c]
      ],
      L: [
        [r, c + 1],
        [r - 1, c]
      ],
      '-': [
        [r, c + 1],
        [r, c - 1]
      ],
      '|': [
        [r - 1, c],
        [r + 1, c]
      ]
    }[symbol].filter((coords) => !map.get(coords.toString()).includes('d:'))[0] || [null, null]
  )
}

const grid = new Map(input.map((line, r) => line.split('').map((char, c) => [[r, c].toString(), char])).flat(1))
const [r, c] = getByValue(grid, 'S')
let [[x1, y1], [x2, y2]] = [
  [r, c + 1],
  [r - 1, c],
  [r, c - 1],
  [r + 1, c]
].filter((coords, i) => ['J7-', '7F|', 'FL-', 'LJ|'][i].includes(grid.get(coords.toString())))
grid.set([r, c].toString(), 'd:0')
let dist
for (dist = 1; (x1 !== x2 || y1 !== y2) && ![x1, x2].includes(null); dist += 1) {
  const [sym1, sym2] = [grid.get([x1, y1].toString()), grid.get([x2, y2].toString())]
  ;[
    [x1, y1],
    [x2, y2]
  ].forEach((coords) => grid.set(coords.toString(), `d:${dist}`))
  ;[[x1, y1], [x2, y2]] = [
    [x1, y1, sym1],
    [x2, y2, sym2]
  ].map(([x, y, sym]) => otherSide(grid, [x, y], sym))
}

console.log(dist)
