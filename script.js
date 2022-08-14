let topValueStr = ''
let bottomValueStr = ''
let operator = ''
let result = ''
let currentOperation = false

let operated = false
let evaluated = false

const topValueElement = document.getElementById('top-value')
const bottomValueElement = document.getElementById('bottom-value')
const operatorValueElement = document.getElementById('operator-value')
const resultValueElement = document.getElementById('result-value')

const maxLen = 21
const update = () => {
  if (
    (!operated && topValueStr.length <= maxLen) ||
    (operated && bottomValueStr.length <= maxLen)
  ) {
    topValueElement.innerHTML = topValueStr
    bottomValueElement.innerHTML = bottomValueStr
    operatorValueElement.innerHTML = operator
    resultValueElement.innerHTML = result
  } else if (!operated) {
    topValueStr = topValueStr.slice(0, maxLen)
  } else if (operated) {
    bottomValueStr = bottomValueStr.slice(0, maxLen)
  }
}

const pressEqual = () => {
  if (currentOperation && bottomValueStr) {
    result = currentOperation()
    update()
    evaluated = true
  }
}

const press = (digit) => {
  if (evaluated) {
    evaluated = false
    pressClear()
  }
  if (!operated) {
    topValueStr += '' + digit
  } else {
    bottomValueStr += '' + digit
  }
  update()
}

const pressOperation = (operation) => {
  if (evaluated) {
    evaluated = false
    const newVal = result
    pressClear()
    topValueStr = newVal
    update()
  }
  if (!topValueStr) return
  console.log(operation)
  switch (operation) {
    case '+':
      currentOperation = operations.sum
      break
    case '-':
      currentOperation = operations.subtract
      break
    case '*':
      currentOperation = operations.multiply
      break
    case '/':
      currentOperation = operations.divide
      break
  }

  operator = operation
  operated = true
  update()
}

const pressNegative = () => {
  if (evaluated) return
  if (!operated) {
    topValueStr =
      topValueStr.slice(0, 1) !== '-' ? '-' + topValueStr : topValueStr.slice(1)
  } else {
    bottomValueStr =
      bottomValueStr.slice(0, 1) !== '-'
        ? '-' + bottomValueStr
        : bottomValueStr.slice(1)
  }
  update()
}

const pressDelete = () => {
  if (evaluated) return
  if (!operated) {
    topValueStr = topValueStr.slice(0, topValueStr.length - 1)
  } else {
    bottomValueStr = bottomValueStr.slice(0, bottomValueStr.length - 1)
  }
  update()
}

const pressDecimal = () => {
  if (evaluated) return
  if (!operated) {
    topValueStr = topValueStr.indexOf('.') < 0 ? topValueStr + '.' : topValueStr
  } else {
    bottomValueStr =
      bottomValueStr.indexOf('.') < 0 ? bottomValueStr + '.' : bottomValueStr
  }
  update()
}

const pressClear = () => {
  topValueStr = ''
  bottomValueStr = ''
  operator = ''
  result = ''
  operated = false
  evaluated = false
  update()
}

const operations = {
  sum: () => {
    return parseFloat(topValueStr) + parseFloat(bottomValueStr)
  },
  subtract: () => {
    return parseFloat(topValueStr) - parseFloat(bottomValueStr)
  },
  multiply: () => {
    return parseFloat(topValueStr) * parseFloat(bottomValueStr)
  },
  divide: () => {
    return parseFloat(topValueStr) / parseFloat(bottomValueStr)
  },
}

document.addEventListener('keydown', (k) => {
  let code = k.code
  switch (code) {
    case 'Digit0':
      press(0)
      setActive('zero')
      break
    case 'Digit1':
      press(1)
      setActive('one')
      break
    case 'Digit2':
      press(2)
      setActive('two')
      break
    case 'Digit3':
      press(3)
      setActive('three')
      break
    case 'Digit4':
      press(4)
      setActive('four')
      break
    case 'Digit5':
      press(5)
      setActive('five')
      break
    case 'Digit6':
      press(6)
      setActive('six')
      break
    case 'Digit7':
      press(7)
      setActive('seven')
      break
    case 'Digit8':
      if (!k.shiftKey) {
        press(8)
        setActive('eight')
      } else {
        pressOperation('*')
        setActive('star')
      }
      break
    case 'Digit9':
      press(9)
      setActive('nine')
      break
    case 'Slash':
      pressOperation('/')
      setActive('slash')
      break
    case 'Period':
      pressDecimal()
      setActive('decimal')
      break
    case 'Equal':
      if (k.shiftKey) {
        pressOperation('+')
        setActive('plus')
      } else {
        pressEqual()
        setActive('equals')
      }
      break
    case 'Enter':
      pressEqual()
      setActive('equals')
      break
    case 'Minus':
      if (!k.shiftKey) {
        pressOperation('-')
        setActive('minus')
      } else {
        pressNegative()
        setActive('negative')
      }
      break
    case 'Backspace':
      pressDelete()
      setActive('delete')
      break
    case 'Escape':
      pressClear()
      setActive('clear')
      break
  }
})

const setActive = (id) => {
  const element = document.getElementById(id)
  const className = element.className
  let prevBg = ''
  let bg = ''
  switch (className) {
    case 'button yellow':
      prevBg = 'rgb(205, 161, 94)'
      bg = 'rgb(171, 134, 78)'
      break
    case 'button brown':
      prevBg = 'rgb(53, 36, 36)'
      bg = 'rgb(42, 28, 28)'
      break
    case 'button equal':
      prevBg = 'rgb(255, 107, 54)'
      bg = 'rgb(213, 90, 45)'
      break
  }
  document.getElementById(id).style.backgroundColor = bg
  document.getElementById(id).style.transform = 'scale(95%)'

  setTimeout(() => {
    document.getElementById(id).style.backgroundColor = prevBg
    document.getElementById(id).style.transform = 'scale(100%)'
  }, 150)
}
