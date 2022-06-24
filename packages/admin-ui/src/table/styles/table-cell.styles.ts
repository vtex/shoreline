import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  flex: 1,
  text: '$body',
  display: 'table-cell',
  borderBottom: '$neutral',
  verticalAlign: 'middle',
  paddingX: '$xl',

  ':first-child': {
    paddingLeft: '$l',
  },

  ':last-child': {
    paddingRight: '$l',
  },
})

export const variants = styleVariants({
  density: {
    regular: {
      height: 80,
    },
    compact: {
      height: 48,
    },
    variable: {
      size: 44,
      minHeight: 44,
    },
  },
  clickable: {
    true: {
      cursor: 'pointer',
      userSelect: 'none',
      ':focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none',
      },
      ':focus': {
        outlineColor: 'focus',
      },
    },
    false: {},
  },
})
