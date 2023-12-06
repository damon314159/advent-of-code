const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data1.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
// Input as array of lines
const input = readFile(inputPath).split('\n')

// Solving time!
// t race time; x hold time; y distance
// Dynamically: 0=x^2-xt+y so we get 0 = [x-t/2]^2 - t^2/4 + y
// Solutions are in range: Math.ceil/floor(t/2 +/- sqrt(t^2/4 - y))
// h is half the parity of t, and d is the discriminant
// We elect not to exploit a symmetry argument to avoid parity concerns of the turning point
const result = input
  .map((line) =>
    (([t, y]) => ((h, d) => Math.ceil(h + d) - Math.floor(h - d) - 1)((t % 2) / 2, Math.sqrt(t ** 2 / 4 - y)))(
      line.split(' ')
    )
  )
  .reduce((prod, cur) => prod * cur)

console.log(result)
