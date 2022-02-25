import { style, styleVariants } from '@vtex/admin-ui-core'

export const dateField = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '$s',
  height: 52,
  width: 288,
  borderRadius: 4,
})

export const variants = styleVariants({
  invalid: {
    true: {
      border: '$form.critical',
    },
    false: {
      border: '$form.neutral',
    },
  },
})

export const label = style({
  text: '$detail',
  color: '$secondary',
})
