const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = ((record) =>
  (cycle = (start, count) =>
    ((tilt) =>
      ((res) =>
        record.has(JSON.stringify(res))
          ? JSON.parse(
              Array.from(record)
                .filter(
                  ([_, val]) =>
                    val ===
                    record.get(JSON.stringify(res)) + ((1000000000 - count) % (count - record.get(JSON.stringify(res))))
                )
                .at(-1)[0]
            )
          : [record.set(JSON.stringify(res), count), cycle(res, count + 1)][1])(tilt(tilt(tilt(tilt(start))))))(
      (lines) =>
        lines[0]
          .split('')
          .map((_, i) =>
            lines
              .map((line) => line[i])
              .reverse()
              .join('')
          )
          .map((line) =>
            line
              .split('#')
              .map((segment) => segment.split('').sort().join(''))
              .join('#')
          )
    ))(input, 1).reduce((sum, line, i, arr) => sum + line.replace(/[^O]/g, '').length * (arr.length - i), 0))(
  new Map([[JSON.stringify(input), 0]])
)

console.log(result)
