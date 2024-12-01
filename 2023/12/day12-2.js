/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
const result = input.reduce(
  (sum, next) =>
    ((stored) =>
      sum +
      (count = (l, s) =>
        (
          (func) =>
          (...args) =>
            ((k) => (stored.has(k) ? stored.get(k) : ((res) => [res, stored.set(k, res)][0])(func(...args))))(
              JSON.stringify(args)
            )
        )((line, sets) =>
          line.length
            ? sets.length
              ? line.length < sets.reduce((setSum, set) => setSum + set) + sets.length - 1
                ? 0
                : line[0] === '.'
                ? count(line.slice(1), sets)
                : ((set) =>
                    line[0] === '#'
                      ? line.slice(0, set).includes('.')
                        ? 0
                        : line[set] === '#'
                        ? 0
                        : count(line.slice(set + 1), sets.slice(1))
                      : count(`#${line.slice(1)}`, sets) + count(`.${line.slice(1)}`, sets))(sets[0])
              : line.replace(/[^#]/g, '').length
              ? 0
              : 1
            : sets.length
            ? 0
            : 1
        )(l, s))(
        ...(([lineSeg, sets]) => [
          `?${lineSeg}`.repeat(5).slice(1),
          `,${sets}`
            .repeat(5)
            .slice(1)
            .split(',')
            .map((el) => +el)
        ])(next.split(' '))
      ))(new Map()),
  0
)

console.info(result)
