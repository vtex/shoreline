import { get } from './util'

export const transformScale = (acc: Record<string, any>, curr: string) => ({
  ...acc,
  /** Transform negative values */
  [curr]: (scale: Record<string, unknown>, value: string | number) => {
    if (typeof value !== 'number' || value >= 0) {
      if (typeof value === 'string' && value.startsWith('-')) {
        const valueWithoutMinus = value.substring(1)
        const n = get(scale, valueWithoutMinus, valueWithoutMinus)

        return `-${n}`
      }

      return get(scale, value, value)
    }

    const absolute = Math.abs(value)
    const n = get(scale, absolute, absolute)

    if (typeof n === 'string') return `-${n}`

    return Number(n) * -1
  },
})

export const transformations = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'top',
  'bottom',
  'left',
  'right',
].reduce(transformScale, {})
