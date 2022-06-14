import type { AnyObject } from '@vtex/admin-ui-util'
import { get } from '@vtex/admin-ui-util'

const TOKEN_PREFIX = '$'

export function isToken(token: string) {
  return typeof token === 'string' && token.startsWith(TOKEN_PREFIX)
}

export function extractTokenCall(token: string) {
  return isToken(token) ? token.substring(1) : token
}

export function handleToken(entry: string, theme: AnyObject, value: any) {
  const root = theme[entry]

  if (!root) {
    return value
  }

  return get(root, extractTokenCall(value), value)
}

type StyleHandler = (value: any, theme: AnyObject) => AnyObject

function createHandler(rule: string, entry: string): StyleHandler {
  return (value, theme) => ({
    [rule]: handleToken(entry, theme, value),
  })
}

const tracking: Record<string, string[]> = {
  bg: ['backgroundColor', 'background'],
  fg: ['color'],
  colors: ['caretColor', 'fill', 'stroke', 'outlineColor', 'columnRuleColor'],
  borderColor: [
    'borderColor',
    'borderTopColor',
    'borderBottomColor',
    'borderLeftColor',
    'borderRightColor',
  ],
  space: [
    'margin',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
    'marginInline',
    'marginInlineStart',
    'marginInlineEnd',
    'padding',
    'paddingBlock',
    'paddingBlockEnd',
    'paddingBlockStart',
    'paddingInline',
    'paddingInlineEnd',
    'paddingInlineStart',
    'scrollPadding',
    'inset',
    'insetBlock',
    'insetBlockEnd',
    'insetBlockStart',
    'insetInline',
    'insetInlineEnd',
    'insetInlineStart',
    'top',
    'right',
    'bottom',
    'left',
    'gridGap',
    'gridColumnGap',
    'gridRowGap',
    'gap',
    'columnGap',
    'rowGap',
  ],
  hspace: [
    'marginRight',
    'marginLeft',
    'paddingRight',
    'paddingLeft',
    'scrollPaddingRight',
    'scrollPaddingLeft',
  ],
  vspace: [
    'marginTop',
    'marginBottom',
    'paddingTop',
    'paddingBottom',
    'scrollPaddingTop',
    'scrollPaddingBottom',
  ],
  border: [
    'border',
    'borderTop',
    'borderRight',
    'borderBottom',
    'borderLeft',
    'borderBlock',
    'borderBlockEnd',
    'borderBlockStart',
    'borderInline',
    'borderInlineEnd',
    'borderInlineStart',
  ],
  borderWidths: [
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderRightWidth',
    'borderBlockStartWidth',
    'borderInlineStartWidth',
    'borderBlockWidth',
    'borderBlockEndWidth',
    'borderInlineEndWidth',
    'borderLeftWidth',
    'borderInlineWidth',
  ],
  borderRadius: [
    'borderRadius',
    'borderTopRightRadius',
    'borderTopLeftRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
    'borderEndEndRadius',
    'borderEndStartRadius',
    'borderStartEndRadius',
    'borderStartStartRadius',
  ],
  borderStyles: [
    'borderStyle',
    'borderTopStyle',
    'borderBottomStyle',
    'borderLeftStyle',
    'borderRightStyle',
    'borderBlockEndStyle',
    'borderBlockStartStyle',
    'borderBlockStyle',
    'borderInlineEndStyle',
    'borderInlineStartStyle',
    'borderInlineStyle',
  ],
  shawdow: ['boxShadow', 'textShadow'],
  zIndices: ['zIndex'],
  transitions: ['transition'],
  opacities: ['opacity'],
  sizes: [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'flexBasis',
    'blockSize',
    'inlineSize',
    'maxBlockSize',
    'maxInlineSize',
    'minBlockSize',
    'minInlineSize',
  ],
}

const coreHandlers: Record<string, StyleHandler> = Object.keys(tracking).reduce(
  (acc, key) => {
    const rules = tracking[key]

    const handlers = rules.reduce(
      (ruleAcc, ruleVal) => ({
        ...ruleAcc,
        [ruleVal]: createHandler(ruleVal, key),
      }),
      {}
    )

    return {
      ...acc,
      ...handlers,
    }
  },
  {}
)

export const handlers: Record<string, StyleHandler> = {
  ...coreHandlers,
  size: (token, theme) => {
    const value = handleToken('sizes', theme, token)

    return {
      width: value,
      height: value,
    }
  },
  minSize: (token, theme) => {
    const value = handleToken('sizes', theme, token)

    return {
      minWidth: value,
      minHeight: value,
    }
  },
  maxSize: (token, theme) => {
    const value = handleToken('sizes', theme, token)

    return {
      maxWidth: value,
      maxHeight: value,
    }
  },
  absoluteSize: (token, theme) => {
    const value = handleToken('sizes', theme, token)

    return {
      minWidth: value,
      minHeight: value,
      maxWidth: value,
      maxHeight: value,
    }
  },
  marginX: (token, theme) => {
    const value = handleToken('hspace', theme, token)

    return {
      marginLeft: value,
      marginRight: value,
    }
  },
  marginY: (value, theme) => ({
    marginTop: handleToken('vspace', theme, value),
    marginBottom: handleToken('vspace', theme, value),
  }),
  paddingX: (token, theme) => {
    const value = handleToken('hspace', theme, token)

    return {
      paddingLeft: value,
      paddingRight: value,
    }
  },
  paddingY: (token, theme) => {
    const value = handleToken('vspace', theme, token)

    return {
      paddingTop: value,
      paddingBottom: value,
    }
  },
  text: (token, theme) => {
    const value = handleToken('text', theme, token)

    return value
  },
  colorScheme: (color, theme) => {
    return {
      background: get(theme, `colors.${color}10`, ''),
      color: get(theme, `colors.${color}60`, ''),
    }
  },
}

// function convertValue(value: string | number, themeSection: AnyObject) {
//   const isNumeric = typeof value === 'number'
//   const isPositive = isNumeric && value >= 0

//   if (isPositive) {
//     return get(themeSection, value, value)
//   }

//   const isString = typeof value === 'string'
//   const isNegative = isString && value.startsWith('-')

//   if (isString && value.startsWith('-')) {
//     const valueWithoutMinus = value.substring(1)
//     const valueFromRule = get(
//       themeSection,
//       valueWithoutMinus,
//       valueWithoutMinus
//     )

//     return `-${valueFromRule}`
//   }
// }

export function handle(props: {
  cssProp: string
  token: any
  theme: AnyObject
}): AnyObject {
  const { cssProp, token, theme } = props

  const handler = handlers[cssProp]

  if (!handler) {
    return {
      [cssProp]: token,
    }
  }

  return handler(token, theme)
}
