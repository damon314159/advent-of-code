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
  return {
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
  }[symbol].find((coords) => !map.get(coords.toString()).includes('d:'))
}

const grid = new Map(input.map((line, r) => line.split('').map((char, c) => [[r, c].toString(), char])).flat(1))
const [r, c] = getByValue(grid, 'S')
let [x, y] = [
  [r, c + 1],
  [r - 1, c],
  [r, c - 1],
  [r + 1, c]
].find((coords, i) => ['J7-', '7F|', 'FL-', 'LJ|'][i].includes(grid.get(coords.toString())))
grid.set([r, c].toString(), 'd:S')

while (x !== r || y !== c) {
  const sym = grid.get([x, y].toString())
  grid.set([x, y].toString(), `d:${sym}`)
  ;[x, y] = otherSide(grid, [x, y], sym) || [r, c]
}

grid.forEach((val, key) => (val.includes('d:') ? grid.set(key, val.slice(2)) : grid.set(key, '.')))
const result = Array.from({ length: 140 }, (_, index) => {
  const start = index * 140
  const end = start + 140
  return Array.from(grid.values()).slice(start, end).join('')
})
  .map((line) =>
    line
      .replace(/S/, 'J')
      .replace(/F[-]*7/g, '')
      .replace(/L[-]*J/g, '')
      .replace(/F[-]*J/g, '|')
      .replace(/L[-]*7/g, '|')
      .split('|')
      .reduce((sum, next, i) => sum + (i % 2 ? next.length : 0), 0)
  )
  .reduce((sum, next) => sum + next, 0)

console.log(result)
