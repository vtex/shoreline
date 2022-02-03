import { get } from '@vtex/admin-ui-util'

export const transforms = [
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
].reduce(reducer, {})

export function createTransform(prop: string) {
  const transformOrGet = get(transforms, prop, get)

  function transform(
    rule: string[] | Record<string, any> | number[],
    token: any
  ) {
    return typeof transformOrGet === 'function'
      ? transformOrGet(rule, token, token)
      : transformOrGet
  }

  return transform
}

function reducer(acc: Record<string, any>, curr: string) {
  return {
    ...acc,
    [curr]: (rule: Record<string, unknown>, value: string | number) => {
      if (typeof value !== 'number' || value >= 0) {
        if (typeof value === 'string' && value.startsWith('-')) {
          const valueWithoutMinus = value.substring(1)
          const n = get(rule, valueWithoutMinus, valueWithoutMinus)

          return `-${n}`
        }

        return get(rule, value, value)
      }

      const absolute = Math.abs(value)
      const n = get(rule, absolute, absolute)

      if (typeof n === 'string') return `-${n}`

      return Number(n) * -1
    },
  }
}
