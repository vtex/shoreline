// This is a bounded var() parser, not a CSS value evaluator. Strings, comments
// and url() contents are opaque. Unsupported escaped identifiers fail closed.
export function references(value) {
  let index = 0
  const skipString = (quote) => {
    index++
    while (index < value.length) {
      if (value[index] === '\\') index += 2
      else if (value[index++] === quote) return
    }
    throw new Error('Unterminated CSS string')
  }
  const skipComment = () => {
    const end = value.indexOf('*/', index + 2)
    if (end < 0) throw new Error('Unterminated CSS comment')
    index = end + 2
  }
  const whitespace = () => {
    while (index < value.length) {
      if (/\s/.test(value[index])) index++
      else if (value.startsWith('/*', index)) skipComment()
      else break
    }
  }
  const scan = (nested = false, opaque = false) => {
    const result = []
    while (index < value.length) {
      const char = value[index]
      if (char === '"' || char === "'") {
        skipString(char)
      } else if (value.startsWith('/*', index)) {
        skipComment()
      } else if (char === ')') {
        if (!nested) throw new Error('Unexpected closing parenthesis')
        index++
        return result
      } else if (char === '\\') {
        if (!opaque)
          throw new Error('Escaped CSS value identifiers are not supported')
        index += 2
      } else if (/[a-zA-Z_-]/.test(char)) {
        const start = index++
        while (index < value.length && /[a-zA-Z0-9_-]/.test(value[index]))
          index++
        const name = value.slice(start, index).toLowerCase()
        if (value[index] !== '(') continue
        index++
        if (name === 'url' || opaque) {
          scan(true, true)
        } else if (name === 'var') {
          whitespace()
          const variableStart = index
          while (
            index < value.length &&
            !/[\s,)]/.test(value[index]) &&
            !value.startsWith('/*', index)
          )
            index++
          const variable = value.slice(variableStart, index)
          if (!/^--[a-zA-Z0-9_-]+$/.test(variable))
            throw new Error(`Unsupported CSS variable name: ${variable}`)
          whitespace()
          if (value[index] === ',') {
            index++
            result.push({ name: variable, fallback: scan(true) })
          } else if (value[index] === ')') {
            index++
            result.push({ name: variable, fallback: null })
          } else {
            throw new Error(`Malformed var(${variable})`)
          }
        } else {
          result.push(...scan(true))
        }
      } else if (char === '(') {
        index++
        result.push(...scan(true, opaque))
      } else {
        index++
      }
    }
    if (nested) throw new Error('Unclosed CSS function')
    return result
  }
  return scan()
}

export function allReferences(refs) {
  return refs.flatMap((ref) => [ref.name, ...allReferences(ref.fallback ?? [])])
}
