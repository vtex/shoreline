import { createPlugin } from '@vtex/onda-system'
import { get } from './util'

export const space = createPlugin({
  name: 'onda-plugin-space',
  onCreateAlias: () => ({
    m: 'margin',
    mx: 'marginX',
    my: 'marginY',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    p: 'padding',
    px: 'paddingX',
    py: 'paddingY',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
  }),
  onCreateRule: () => ({
    margin: 'space',
    marginTop: 'space',
    marginRight: 'space',
    marginBottom: 'space',
    marginLeft: 'space',
    marginX: 'space',
    marginY: 'space',
    marginBlock: 'space',
    marginBlockEnd: 'space',
    marginBlockStart: 'space',
    marginInline: 'space',
    marginInlineEnd: 'space',
    marginInlineStart: 'space',
    padding: 'space',
    paddingTop: 'space',
    paddingRight: 'space',
    paddingBottom: 'space',
    paddingLeft: 'space',
    paddingX: 'space',
    paddingY: 'space',
    paddingBlock: 'space',
    paddingBlockEnd: 'space',
    paddingBlockStart: 'space',
    paddingInline: 'space',
    paddingInlineEnd: 'space',
    paddingInlineStart: 'space',
    scrollPadding: 'space',
    scrollPaddingTop: 'space',
    scrollPaddingRight: 'space',
    scrollPaddingBottom: 'space',
    scrollPaddingLeft: 'space',
    scrollPaddingX: 'space',
    scrollPaddingY: 'space',
    inset: 'space',
    insetBlock: 'space',
    insetBlockEnd: 'space',
    insetBlockStart: 'space',
    insetInline: 'space',
    insetInlineEnd: 'space',
    insetInlineStart: 'space',
    top: 'space',
    right: 'space',
    bottom: 'space',
    left: 'space',
    gridGap: 'space',
    gridColumnGap: 'space',
    gridRowGap: 'space',
    gap: 'space',
    columnGap: 'space',
    rowGap: 'space',
  }),
  onTransform: () => {
    return [
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
  },
  onSplit: () => ({
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  }),
})

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
