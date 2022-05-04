const MASK_USER_INPUT_SYMBOL = '_'

export const maskedDateFormatter =
  (mask: string, acceptRegexp: RegExp) => (value: string) => {
    return value
      .split('')
      .map((char, i) => {
        acceptRegexp.lastIndex = 0

        if (i > mask.length - 1) {
          return ''
        }

        const maskChar = mask[i]
        const nextMaskChar = mask[i + 1]

        const acceptedChar = acceptRegexp.test(char) ? char : ''
        const formattedChar =
          maskChar === MASK_USER_INPUT_SYMBOL
            ? acceptedChar
            : maskChar + acceptedChar

        if (
          i === value.length - 1 &&
          nextMaskChar &&
          nextMaskChar !== MASK_USER_INPUT_SYMBOL
        ) {
          // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
          return formattedChar ? formattedChar + nextMaskChar : ''
        }

        return formattedChar
      })
      .join('')
  }
