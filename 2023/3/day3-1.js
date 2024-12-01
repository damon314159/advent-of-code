const fs = require('fs')
const path = require('path')

const inputPath = path.join(__dirname, 'data.txt')
const readFile = (p) => fs.readFileSync(p, { encoding: 'utf8' })
const input = readFile(inputPath)

// Solving time!
const result = input
  .match(
    /\d*(?:\d(?:(?=[\s\S]{141}[#--/=@])|(?=[\s\S]{140}[#--/=@])|(?=[\s\S]{139}[#--/=@])|(?=[#--/=@])|(?<=[#--/=@][\s\S])|(?<=[#--/=@][\s\S]{140})|(?<=[#--/=@][\s\S]{141})|(?<=[#--/=@][\s\S]{142})))\d*/g
  )
  .reduce((sum, cur) => sum + +cur, 0)

console.log(result)
