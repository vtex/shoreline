import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  display: 'flex',
  alignItems: 'center',
  text: '$body',
  paddingX: '$xl',
  minHeight: '2.75rem',

  ':first-child': {
    paddingLeft: '$l',
  },

  ':last-child': {
    paddingRight: '$l',
  },
})

export const variants = styleVariants({
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
