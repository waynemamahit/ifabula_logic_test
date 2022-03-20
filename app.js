
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { text } = require('express')
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

// Soal 1
app.post('/', (req, res) => {
  if (isNaN(req.body.number)) {
    return res.json({
      message: 'Number is not numeric!'
    })
  }
  
  let number = Number(req.body.number)
  let fib = [1, 1]
  for (let i = 2; i < number; i++) {
    if (i >= 2) {
      fib[i] = fib[i - 2] + fib[i - 1]
    }
  }

  return res.json({
    data: fib.reverse().join(' ')
  })
})

// Soal2
app.get('/', (req, res) => {
  if (req.body.string === undefined) {
    return res.json({
      messsage: "String param not exists!"
    })
  }

  let string = req.body.string.toLowerCase().split("")

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  let alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
  
  let result = []
  for (let strI = 0; strI < string.length; strI++) {
    let alphaIndex = alphabet.findIndex(alphObj => alphObj === string[strI])
    let beforeAlphaIndex = null;
    resultChar = string[strI]
    
    resultLoop2: for (let strI2 = strI + 1; strI2 < string.length; strI2++) {
      let checkAlpha2 = alphabet.findIndex(alphObj => alphObj === string[strI2])
      if (checkAlpha2 !== (alphaIndex + 1) || alphaIndex === beforeAlphaIndex) {
        break resultLoop2
      }
      resultChar += string[strI2]
      beforeAlphaIndex = alphaIndex
      alphaIndex += 1
    }
    result.push(resultChar)
  }

  let resultNumberLength = result.map(resultItem => resultItem.length)
  resultNumberLength.sort((a, b) => b - a)
  let resultIndex = result
    .map(resultItem => resultItem.length)
    .findIndex(resultNumberItem => resultNumberItem === resultNumberLength[0])
  return res.json({ 
    data: result[resultIndex],
    dataLength: resultNumberLength[0]
  })
})

const port = 3000
app.listen(port, () => console.log(`API server listening on port ${port}!`))

module.exports = app;
