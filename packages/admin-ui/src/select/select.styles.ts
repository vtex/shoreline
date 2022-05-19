import { styles, styleVariants, focusVisible } from '@vtex/admin-ui-core'

export const baseline = styles({
  appearance: 'none',
  cursor: 'pointer',
  padding: '$m',
  paddingRight: '2rem',
  text: '$body',
  bg: '$form.neutral',

  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
    cursor: 'not-allowed',
  },
})

export const variants = styleVariants({
  error: {
    false: {
      ...focusVisible('neutral'),
      border: '$form.neutral',
      borderRadius: 'default',
    },
    true: {
      ...focusVisible('critical'),
      border: '$form.critical',
      borderRadius: 'default',
    },
  },
  selected: {
    true: { color: '$form.neutral' },
    false: { color: '$secondary' },
  },
})

export const caret = styles({
  height: '24px',
  position: 'absolute',
  right: 16,
  top: 0,
  bottom: 0,
  margin: 'auto',
  color: '$secondary',
})
