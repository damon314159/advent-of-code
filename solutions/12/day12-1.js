const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input
  .map((line) =>
    (([lineSeg, sets]) =>
      lineSeg
        .split('')
        .reduce(
          (options, char) =>
            char === '?' ? options.map((el) => [`${el}.`, `${el}#`]).flat() : options.map((el) => `${el}${char}`),
          ['']
        )
        .map((option) =>
          option
            .split(/\.+/)
            .filter((el) => el !== '')
            .map((str) => str.length)
            .toString()
        )
        .filter((el) => el === sets).length)(line.split(' '))
  )
  .reduce((sum, cur) => sum + cur)

console.log(result)
