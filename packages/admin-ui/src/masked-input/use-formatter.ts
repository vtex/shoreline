import { useMemo } from 'react'

const MASK_INPUT_SYMBOL = '_'

export interface UseFormatterProps {
  mask: string
  accept?: RegExp
}

export function useFormatter(props: UseFormatterProps) {
  const { mask, accept = /\d/g } = props
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
  const { mask, accept = /\d/g } = props

  function formatter(value: string) {
    return value
      .split('')
      .map((char, i) => {
        accept.lastIndex = 0

        if (i >= mask.length) {
          return ''
        }

        const maskChar = mask[i]
        const nextMaskChar = mask[i + 1]

        const acceptedChar = accept.test(char) ? char : ''
        const formattedChar = isMaskSymbol(maskChar)
          ? acceptedChar
          : maskChar + acceptedChar

        const shouldPreRenderNextSymbol =
          i === value.length - 1 && nextMaskChar && !isMaskSymbol(nextMaskChar)

        if (shouldPreRenderNextSymbol) {
          // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
          return formattedChar ? formattedChar + nextMaskChar : ''
        }

        return formattedChar
      })
      .join('')
  }

  return formatter
}

function isMaskSymbol(str: string) {
  return str === MASK_INPUT_SYMBOL
}
