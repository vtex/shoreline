import { createPlugin } from '../system'
import { get } from '@vtex/admin-ui-util'

const defaultBreakpoints = ['40em', '48em', '64em', '75em']

function negativeValuesTransformer(acc: Record<string, any>, curr: string) {
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

export const atomicAdminUI = createPlugin({
  name: 'onda-plugin-admin-ui',
  namespaces: [
    'opacities',
    'transitions',

    'border',
    'borders',
    'borderWidths',
    'borderStyles',
    'borderRadius',

    'colors',
    'background',
    'foreground',
    'borderColor',

    'shadows',
    'zIndices',

    'breakpoints',

    'sizes',

    'space',

    'fonts',
    'fontSizes',
    'fontWeights',
    'lineHeights',
    'letterSpacings',
    'fontSettings',
    'text',
  ],
  aliases: (theme) => {
    const breakpoints = theme?.breakpoints ?? defaultBreakpoints

    const [, tablet, desktop, widescreen] = breakpoints

    return {
      bg: 'backgroundColor',

      justify: 'justifyContent',
      direction: 'flexDirection',
      align: 'alignItems',
      grow: 'flexGrow',
      shrink: 'flexShrink',
      basis: 'flexBasis',
      wrap: 'flexWrap',

      '@tablet': `@media (min-width: ${tablet}) and (max-width: ${desktop})`,
      '@desktop': `@media (min-width: ${desktop}) and (max-width: ${widescreen})`,
      '@widescreen': `@media (min-width: ${widescreen})`,

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

      fontSettings: 'fontVariationSettings',
    }
  },
  rules: {
    opacity: 'opacities',
    transition: 'transitions',

    border: 'border',
    borderTop: 'borders',
    borderRight: 'borders',
    borderBottom: 'borders',
    borderLeft: 'borders',
    borderWidth: 'borderWidths',
    borderStyle: 'borderStyles',
    borderRadius: 'borderRadius',
    borderTopRightRadius: 'borderRadius',
    borderTopLeftRadius: 'borderRadius',
    borderBottomRightRadius: 'borderRadius',
    borderBottomLeftRadius: 'borderRadius',
    borderTopWidth: 'borderWidths',
    borderTopStyle: 'borderStyles',
    borderBottomWidth: 'borderWidths',
    borderBottomStyle: 'borderStyles',
    borderLeftWidth: 'borderWidths',
    borderLeftStyle: 'borderStyles',
    borderRightWidth: 'borderWidths',
    borderRightStyle: 'borderStyles',
    borderBlock: 'borders',
    borderBlockEnd: 'borders',
    borderBlockEndStyle: 'borderStyles',
    borderBlockEndWidth: 'borderWidths',
    borderBlockStart: 'borders',
    borderBlockStartStyle: 'borderStyles',
    borderBlockStartWidth: 'borderWidths',
    borderBlockStyle: 'borderStyles',
    borderBlockWidth: 'borderWidths',
    borderEndEndRadius: 'borderRadius',
    borderEndStartRadius: 'borderRadius',
    borderInline: 'borders',
    borderInlineEnd: 'borders',
    borderInlineEndStyle: 'borderStyles',
    borderInlineEndWidth: 'borderWidths',
    borderInlineStart: 'borders',
    borderInlineStartStyle: 'borderStyles',
    borderInlineStartWidth: 'borderWidths',
    borderInlineStyle: 'borderStyles',
    borderInlineWidth: 'borderWidths',
    borderStartEndRadius: 'borderRadius',
    borderStartStartRadius: 'borderRadius',

    color: 'foreground',
    backgroundColor: 'background',
    borderColor: 'borderColor',
    caretColor: 'colors',
    columnRuleColor: 'colors',
    borderTopColor: 'borderColor',
    borderBottomColor: 'borderColor',
    borderLeftColor: 'borderColor',
    borderRightColor: 'borderColor',
    fill: 'colors',
    stroke: 'colors',
    outlineColor: 'colors',

    boxShadow: 'shadows',
    textShadow: 'shadows',
    zIndex: 'zIndices',

    width: 'sizes',
    minWidth: 'sizes',
    maxWidth: 'sizes',
    height: 'sizes',
    minHeight: 'sizes',
    maxHeight: 'sizes',
    flexBasis: 'sizes',
    blockSize: 'sizes',
    inlineSize: 'sizes',
    maxBlockSize: 'sizes',
    maxInlineSize: 'sizes',
    minBlockSize: 'sizes',
    minInlineSize: 'sizes',
    size: 'sizes',
    minSize: 'sizes',
    maxSize: 'sizes',
    absoluteSize: 'sizes',

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

    fontFamily: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    letterSpacing: 'letterSpacings',
    fontVariationSettings: 'fontSettings',
    text: 'text',
  },
  transforms: [
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
  ].reduce(negativeValuesTransformer, {}),
  splits: {
    size: ['width', 'height'],
    minSize: ['minWidth', 'minHeight'],
    maxSize: ['maxWidth', 'maxHeight'],
    absoluteSize: ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'],

    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
})
