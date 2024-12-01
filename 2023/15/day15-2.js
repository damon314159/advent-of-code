/* eslint-disable no-nested-ternary */
const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath)

// Solving time!
const result = input
  .split(',')
  .reduce(
    (boxes, str) =>
      [
        ((label) =>
          ((hash) =>
            ((box) =>
              ((tester) =>
                ((found) =>
                  ((foundInd) =>
                    str.includes('-')
                      ? found
                        ? box.splice(foundInd, 1)
                        : null
                      : found
                      ? box.splice(foundInd, 1, label + str.at(-1))
                      : box.push(label + str.at(-1)))(box.findIndex(tester)))(box.some(tester)))(
                (lens) => lens.slice(0, -1) === label
              ))(boxes[hash]))(
            label.split('').reduce((sequence, char) => (17 * (sequence + char.charCodeAt(0))) % 256, 0)
          ))(str.split(/[-=]/)[0]),
        boxes
      ][1],
    Array(256)
      .fill(0)
      .map(() => [])
  )
  .reduce((total, box, i) => total + box.reduce((sum, lens, j) => sum + (i + 1) * (j + 1) * lens.at(-1), 0), 0)

console.log(result)
