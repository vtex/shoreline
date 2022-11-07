import { style, styleVariants } from '@vtex/admin-ui-core'

export const dateField = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '$space-2 $space-3',
  height: 52,
  width: 288,
  borderRadius: 4,
})

export const variants = styleVariants({
  tone: {
    critical: {
      border: '$form.critical',
    },
    neutral: {
      border: '$form.neutral',
    },
  },
  disabled: {
    true: {
      border: '$disabled',
    },
  },
})

export const label = style({
  text: '$detail',
  color: '$secondary',
})
