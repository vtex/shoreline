import { style, styleVariants } from '@vtex/admin-ui-core'

export const variants = styleVariants({
  style: {
    disc: {
      listStyleType: 'disc',
    },
    circle: {
      listStyleType: 'circle',
    },
    none: {
      listStyleType: 'none',
    },
    square: {
      listStyleType: 'square',
    },
    decimal: {
      listStyleType: 'decimal',
    },
    inherit: {
      listStyleType: 'inherit',
    },
    initial: {
      listStyleType: 'initial',
    },
    unset: {
      listStyleType: 'unset',
    },
  },
})

export const baseline = style({
  text: '$body',
  listStylePosition: 'inside',
  '> ul, ol': {
    paddingLeft: 2,
  },
  '> :not(last-child)': {
    paddingBottom: 1,
  },
})
