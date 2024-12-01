const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const cards = [...Array(input.length)].fill(1)
const matches = input.map((line) =>
  (([wins, yours]) => {
    const winSet = new Set(wins.split(' ').filter((el) => el !== ''))
    return yours.split(' ').filter((el) => winSet.has(el)).length
  })(line.split(':')[1].split('|'))
)
matches.forEach((el, i) => {
  for (let j = 1; j <= el; j += 1) {
    cards[i + j] += cards[i]
  }
})
const result = cards.reduce((sum, cur) => sum + cur)

console.log(result)
