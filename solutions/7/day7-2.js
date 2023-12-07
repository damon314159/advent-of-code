const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input
  .map((line) =>
    (
      line
        .slice(0, 5)
        .replace(/J/g, '_')
        .split('')
        .sort()
        .join('')
        .replace(/(\w)(\1|_){4}/, 'z')
        .replace(/(\w)\1\w__|(\w)\2{2}\w_|(\w)(\3|_){3}/, 'y')
        .replace(/(\w)\1{2}(\w)\2|(\w)\3(\w)\4(\4|_)/, 'x')
        .replace(/(\w)\1\w{1,2}_|(\w)(\2|_){2}/, 'w')
        .replace(/(\w)\1\w?(\w)\2/, 'v')
        .replace(/(\w)(\1|_)/, 'u')
        .replace(/\w{5}/, 't')
        .replace(/[^t-z]/g, '') + line
    )
      .replace(/A/g, 'Z')
      .replace(/K/g, 'Y')
      .replace(/Q/g, 'X')
      .replace(/T/g, 'W')
      .replace(/J/g, '1')
  )
  .sort()
  .reduce((sum, next, i) => sum + (i + 1) * next.split(' ')[1], 0)

console.log(result)
