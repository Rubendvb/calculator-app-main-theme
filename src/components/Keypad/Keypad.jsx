import { useState } from 'react'
import Button from '../Button/Button'
import './Keypad.scss'

import * as math from 'mathjs'

const buttonsValues = [
  [7, 8, 9, 'del'],
  [4, 5, 6, '+'],
  [1, 2, 3, '-'],
  ['.', 0, '/', 'x'],
  ['reset', '='],
]

export default function Keypad() {
  const [result, setResult] = useState(0)
  const [operator, setOperator] = useState('')

  const handleClick = (value) => {
    setResult('')
    console.log(value)

    if (result == '') {
      setResult('')
    }

    if (!Number.isInteger(value)) {
      setOperator(value)
    } else {
      if (operator) {
        if (String(result).slice(-1) === operator) {
          setResult(String(result).concat(value))
        } else {
          setResult(result + operator + value)
        }

        setOperator('')
      } else {
        setResult(String(result).concat(value))
      }
    }
  }

  const calculate = () => {
    try {
      setResult(math.evaluate(Number(result)).toString)
    } catch (error) {
      setResult(error)
    }
  }

  return (
    <main className="keypad">
      <div className="keypad__screen">{result}</div>

      <div className="keypad__container">
        {buttonsValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              num={btn}
              onClick={btn === '=' ? () => calculate : () => handleClick(btn)}
            />
          )
        })}
      </div>
    </main>
  )
}
