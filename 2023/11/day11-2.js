const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = ((stretched) =>
  stretched[0]
    .split('')
    .map((_, i) => stretched.map((line) => line[i]).join(''))
    .map((line) => (line.includes('#') ? line : 'M'.repeat(line.length))))(
  input.map((line) => (line.includes('#') ? line : 'M'.repeat(line.length)))
)
  .reduce(
    ([x, y], line, r, expanded) =>
      (([lineX, lineY]) => [x.concat(lineX), y.concat(lineY)])(
        line.split('').reduce(
          ([lineX, lineY], char, c) =>
            char === '#'
              ? [
                  lineX.concat(
                    ((subLine) => subLine.replace(/[^M]/g, '').length * 1000000 + subLine.replace(/M/g, '').length)(
                      expanded
                        .map((l) => l[c])
                        .slice(0, r)
                        .join('')
                    )
                  ),
                  lineY.concat(
                    ((subLine) => subLine.replace(/[^M]/g, '').length * 1000000 + subLine.replace(/M/g, '').length)(
                      line.slice(0, c)
                    )
                  )
                ]
              : [lineX, lineY],
          [[], []]
        )
      ),
    [[], []]
  )
  .reduce(
    (sum, coord) =>
      sum + coord.sort((a, b) => a - b).reduce(([p, t], next, i) => [p + next * i - t, t + next], [0, 0])[0],
    0
  )

console.log(result)
