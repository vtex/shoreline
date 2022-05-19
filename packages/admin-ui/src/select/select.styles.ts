import { styles, styleVariants, focusVisible } from '@vtex/admin-ui-core'

export const baseline = styles({
  borderRadius: 'default',
  appearance: 'none',
  cursor: 'pointer',
  padding: '$m',
  paddingRight: '2rem',
  bg: '$form.neutral',
  width: '100%',
})

export const variants = styleVariants({
  error: {
    false: {},
    true: {
      ...focusVisible('critical'),
      border: '$form.critical',
    },
  },
  selected: {
    true: { color: '$form.neutral', text: '$detail' },
    false: { color: '$secondary', text: '$body' },
  },
  variant: {
    default: {
      border: '$form.neutral',
      ...focusVisible('neutral'),

      ':disabled': {
        bg: '$disabled',
        color: '$disabled',
        border: '$disabled',
        cursor: 'not-allowed',
      },
    },
    inline: {
      ...focusVisible('neutral', {
        focus: { bg: '$action.neutral.tertiaryHover' },
      }),

      ':hover': {
        bg: '$action.neutral.tertiaryHover',
      },

      ':disabled': {
        bg: '$disabled',
        color: '$disabled',
        cursor: 'not-allowed',
      },
    },
  },
})

export const caret = styles({
  height: '1.5rem',
  position: 'absolute',
  right: 16,
  top: 0,
  bottom: 0,
  margin: 'auto',
  color: '$secondary',
})
