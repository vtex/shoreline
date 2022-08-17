import { styleVariants, style } from '@vtex/admin-ui-core'

export const variants = styleVariants({
  orientation: {
    horizontal: {
      borderBottom: 0,
    },
    vertical: {
      borderLeft: 0,
      height: 'auto',
    },
  },
})

export const baseline = style({
  border: '$neutral',
  margin: 0,
})
