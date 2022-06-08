import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  flex: 1,
  text: '$body',
  display: 'table-cell',
  borderBottom: '$neutral',
  verticalAlign: 'middle',
  paddingX: 2,
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
      verticalAlign: 'top',
      minHeight: 48,
      paddingY: 4,
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
