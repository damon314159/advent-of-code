const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
const input = readFile(inputPath)

// Solving time!
const result = input.split('\n\n').reduce(
  (sum, pattern) =>
    ((counter) =>
      counter(pattern.split('\n')) ||
      100 *
        counter(
          ((lines) => lines[0].split('').map((_, i) => lines.map((line) => line[i]).join('')))(pattern.split('\n'))
        ))((lines) =>
      ((arr) => (arr.length ? arr[0] + 1 : 0))(
        lines.reduce(
          (valid, line) =>
            valid.filter((i) =>
              ((rev) =>
                ((len) =>
                  i + 1 <= len
                    ? line.slice(0, i + 1) === rev(line.slice(i + 1, 2 * i + 2))
                    : line.slice(-len) === rev(line.slice(2 * -len, -len)))(line.length - i - 1))((str) =>
                str.split('').reverse().join('')
              )
            ),
          Array(lines[0].length - 1)
            .fill(0)
            .map((_, i) => i)
        )
      )
    ) + sum,
  0
)

console.log(result)
