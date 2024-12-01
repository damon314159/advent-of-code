const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
const input = readFile(inputPath)

// Solving time!
const result = ((patternsCalc) =>
  input
    .split('\n\n')
    .map((pattern) => [
      pattern
        .split('\n')
        .reduce(
          (options, line, i, lines) =>
            options.concat(
              line
                .split('')
                .reduce(
                  (charsets, char, j) =>
                    charsets.concat(
                      [
                        ...lines.slice(0, i),
                        line.slice(0, j) + (char === '#' ? '.' : '#') + line.slice(j + 1),
                        ...lines.slice(i + 1)
                      ].join('\n')
                    ),
                  []
                )
            ),
          []
        ),
      patternsCalc([pattern])[0]
    ])
    .map(
      ([patterns, old]) =>
        patternsCalc(patterns)
          .flat()
          .filter((el) => el !== old)[0]
    ))((patterns) =>
  patterns
    .map((pattern) =>
      ((counter) => [
        counter(pattern.split('\n'), 1),
        counter(
          ((lines) => lines[0].split('').map((_, i) => lines.map((line) => line[i]).join('')))(pattern.split('\n')),
          100
        )
      ])((lines, factor) =>
        ((arr) => (arr.length ? arr.map((num) => factor * (num + 1)) : [0]))(
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
      )
        .flat()
        .filter((el) => el)
    )
    .flat()
).reduce((sum, next) => sum + next, 0)

console.log(result)
