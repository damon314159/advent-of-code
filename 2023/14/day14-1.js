const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input[0]
  .split('')
  .map((_, i) =>
    input
      .map((line) => line[i])
      .reverse()
      .join('')
  )
  .reduce(
    (total, line) =>
      line
        .split('#')
        .reduce(
          ([sum, len], next) => [
            sum +
              ((num) =>
                num
                  ? ((len + next.length + 1) * (len + next.length) -
                      (len + next.length + 1 - num) * (len + next.length - num)) /
                    2
                  : 0)(next.replace(/[^O]/g, '').length),
            len + next.length + 1
          ],
          [0, 0]
        )[0] + total,
    0
  )

console.log(result)
