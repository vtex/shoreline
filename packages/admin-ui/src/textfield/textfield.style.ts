import { style, styleVariants } from '@vtex/admin-ui-core'

export const container = style({
  display: 'flex',
  alignItems: 'center',
  text: '$body',
  border: '$form.neutral',
  borderRadius: '$default',
  bg: '$form.neutral',
  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus-within': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
})

export const containerVariants = styleVariants({
  error: {
    true: {
      border: '$form.critical',
      ':hover': {
        border: '$form.criticalHover',
      },
      ':focus-within': {
        border: '$form.criticalFocus',
        boxShadow: '$ring.critical',
      },
    },
    false: {},
  },
  disabled: {
    true: {
      bg: '$disabled',
      color: '$disabled',
      border: '$disabled',
      ':hover': {
        border: '$disabled',
      },
    },
    false: {},
  },
})

export const input = style({
  padding: '$m',
  width: '100%',
  borderRadius: '$default',
  bg: '$form.neutral',
  ':focus': {
    outline: 'none',
  },
})

export const term = style({
  padding: '$m',
  color: '$secondary',
  display: 'flex',
  alignItems: 'center',
})

export const termVariants = styleVariants({
  type: {
    prefix: {
      borderRight: '$form.neutral',
    },
    suffix: {
      borderLeft: '$form.neutral',
    },
  },
})
