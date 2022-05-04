import { useMemo } from 'react'

const MASK_INPUT_SYMBOL = '_'

export interface UseFormatterProps {
  mask: string
  accept: RegExp
}

export function useFormatter(props: UseFormatterProps) {
  const { mask, accept } = props
  const formatter = useMemo(
    () =>
      createFormatter({
        mask,
        accept,
      }),
    [mask, accept]
  )

  return formatter
}

function createFormatter(props: UseFormatterProps) {
  const { mask, accept } = props

  function formatter(value: string) {
    return value
      .split('')
      .map((char, i) => {
        accept.lastIndex = 0

        if (i > mask.length - 1) {
          return ''
        }

        const maskChar = mask[i]
        const nextMaskChar = mask[i + 1]

        const acceptedChar = accept.test(char) ? char : ''
        const formattedChar =
          maskChar === MASK_INPUT_SYMBOL
            ? acceptedChar
            : maskChar + acceptedChar

        if (
          i === value.length - 1 &&
          nextMaskChar &&
          nextMaskChar !== MASK_INPUT_SYMBOL
        ) {
          // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
          return formattedChar ? formattedChar + nextMaskChar : ''
        }

        return formattedChar
      })
      .join('')
  }

  return formatter
}
