import { style, styleVariants } from '@vtex/admin-ui-core'

const height = '2.75rem'

export const container = style({
  height,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  text: '$body',
  border: '$form.neutral',
  borderRadius: '$default',
  bg: '$form.neutral',
  cursor: 'text',
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
  height,
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
