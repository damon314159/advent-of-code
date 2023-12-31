const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
const input = readFile(inputPath)

// Solving time!
const result = [
  ...input.matchAll(
    /[*](?:(?<=(?<=[\s\S](?=(\d+))\d*\d\D)\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?<=\D\D[\s\S]{140})(?=\D)(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=\D)(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D[\s\S])(?=\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D)|(?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?<=\D\D[\s\S]{141})(?=\D)(?=[\s\S]{139}\D\D\D)|(?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D)|(?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D)|(?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D)|(?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?=[\s\S]{139}\D\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?=\D)(?=[\s\S]{140}\D\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?=\D)|(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?=\D)(?=[\s\S]{139}\D\D)|(?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{140}\D\D)|(?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])|(?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{139}\D\D)|(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d(?=\D\d\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D))/g
  )
].reduce((sum, cur) => sum + ((arr) => arr[1] * arr[2])(cur.filter((e) => e !== undefined)), 0)

console.log(result)

// Test for digits
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})          -- top left (pos 1)
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141}) -- top mid  (pos 2)
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})           -- top right  (pos 3)
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])               -- left  (pos 4)
// (?=\d(?=\d*[\s\S](?<=(\d+))))                       -- right  (pos 5)
// (?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)           -- down left  (pos 6)
// (?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)  -- down mid  (pos 7)
// (?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))            -- down right  (pos 8)

// Test for not digit
// (?<=\D[\s\S]{142}) -- top left (pos 1)
// (?<=\D[\s\S]{141}) -- top mid  (pos 2)
// (?<=\D[\s\S]{140}) -- top right  (pos 3)
// (?<=\D[\s\S])      -- left  (pos 4)
// (?=\D)             -- right  (pos 5)
// (?=[\s\S]{139}\D)  -- down left  (pos 6)
// (?=[\s\S]{140}\D)  -- down mid  (pos 7)
// (?=[\s\S]{141}\D)  -- down right  (pos 8)

// NOTATION
// <Regex>, <Positions Matched>
// [\s\S](?=(\d+))

// Including position 1
// (?<=(?<=[\s\S](?=(\d+))\d*\d\D)\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D\D) 1+3
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?<=\D\D[\s\S]{140})(?=\D)(?=[\s\S]{139}\D\D\D) 1+4
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D) 1+5
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D) 1+6
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D) 1+7
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{142})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D) 1+8

// Including position 2
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=\D)(?=[\s\S]{139}\D\D\D) 2+4
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D) 2+5
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D) 2+6
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D[\s\S])(?=\D) 2+7
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S]{141})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D) 2+8

// Including position 3
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?<=\D\D[\s\S]{141})(?=\D)(?=[\s\S]{139}\D\D\D) 3+4
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=[\s\S]{139}\D\D\D) 3+5
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D)(?=[\s\S]{140}\D\D) 3+6
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D) 3+7
// (?<=\d(?=\d*[\s\S](?<=(\d+)))[\s\S]{140})(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D[\s\S]{141})(?<=\D[\s\S])(?=\D)(?=[\s\S]{139}\D\D) 3+8

// Including position 4
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?=[\s\S]{139}\D\D\D) 4+5
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?=\D)(?=[\s\S]{140}\D\D) 4+6
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?=\D) 4+7
// (?<=(?<=[\s\S](?=(\d+))\d*)\d[\s\S])(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?=\D)(?=[\s\S]{139}\D\D) 4+8

// Including position 5
// (?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{140}\D\D) 5+6
// (?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{140}(?<=[\s\S](?=(\d+))\d*)\d)(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S]) 5+7
// (?=\d(?=\d*[\s\S](?<=(\d+))))(?=[\s\S]{141}\d(?=\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=[\s\S]{139}\D\D) 5+8

// Including position 6
// (?=[\s\S]{139}(?<=[\s\S](?=(\d+))\d*)\d(?=\D\d\d*[\s\S](?<=(\d+))))(?<=\D\D\D[\s\S]{140})(?<=\D[\s\S])(?=\D) 6+8
