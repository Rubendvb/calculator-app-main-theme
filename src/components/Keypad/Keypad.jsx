import { useState } from 'react'
import Button from '../Button/Button'
import './Keypad.scss'

const buttonsValues = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.'],
]

const operations = ['del', '/', 'x', '+', '-', 'reset', '=']

export default function Keypad() {
  const [currentValue, setCurrentValue] = useState('0')
  const [completeOperation, setCompleteOperation] = useState('0')
  const [pendingOperation, setPendingOperation] = useState(null)
  const [pendingValue, setPendingValue] = useState(null)

  const handleClick = (value) => {
    setCurrentValue((preValue) => {
      if (preValue === '0') {
        return value
      } else {
        return preValue + value
      }
    })

    setCompleteOperation((prevOperation) => {
      if (prevOperation === '0') {
        return value
      } else {
        return prevOperation + ' ' + value
      }
    })
  }

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + ' ' + operation)
    setPendingOperation(operation)
    setPendingValue(currentValue)
    setCurrentValue('0')
  }

  const handleClear = () => {
    setCurrentValue('0')
    setPendingOperation(null)
    setPendingValue(null)
    setCompleteOperation('0')
  }

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValue) {
      return
    }

    const num1 = parseFloat(pendingValue)
    const num2 = parseFloat(currentValue)

    let result

    switch (pendingOperation) {
      case '+':
        result = num1 + num2
        break
      case '-':
        result = num1 - num2
        break
      case 'x':
        result = num1 * num2
        break
      case '/':
        if (num2 !== 0) {
          result = num1 / num2
        } else {
          setCurrentValue('Error')
          setCompleteOperation('Error')
          setPendingOperation(null)
          setPendingValue(null)
          return
        }
        break

      default:
        break
    }

    setCompleteOperation(
      pendingValue + ' ' + pendingOperation + ' ' + currentValue
    )

    setCurrentValue(result.toString())
    setPendingOperation(null)
    setPendingValue(null)
  }

  const handleDel = () => {
    if (currentValue === '0') {
      return
    }

    setCurrentValue(currentValue.slice(0, -1))
  }

  return (
    <main className="keypad">
      <div className="keypad__screen">
        <span>{completeOperation}</span>
        <span>{currentValue}</span>
      </div>

      <div className="keypad__container">
        {buttonsValues.flat().map((btn, i) => {
          return <Button key={i} num={btn} onClick={() => handleClick(btn)} />
        })}

        {operations.flat().map((operator, i) => {
          return (
            <Button
              key={i}
              num={operator}
              onClick={() =>
                operator === 'reset'
                  ? handleClear()
                  : operator === 'del'
                  ? handleDel()
                  : handleOperation(operator)
                  ? operator === '='
                  : handleCalculate()
              }
            />
          )
        })}
      </div>
    </main>
  )
}
