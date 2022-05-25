import { style, styleVariants, focusVisible } from '@vtex/admin-ui-core'

export const baseline = style({
  borderRadius: 'default',
  appearance: 'none',
  cursor: 'pointer',
  padding: '$m',
  paddingRight: '2rem',
  bg: '$form.neutral',
  width: '100%',
  text: '$body',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const variants = styleVariants({
  variant: {
    default: {
      boxSizing: 'border-box',
      height: '2.75rem',
      padding: '$m',
      paddingRight: '2.5rem',
      border: '$form.neutral',
      ...focusVisible('neutral'),

      ':disabled': {
        bg: '$disabled',
        color: '$disabled',
        border: '$disabled',
        cursor: 'not-allowed',
        '+ * > svg': {
          color: '$disabled',
        },
      },
    },
    inline: {
      padding: '$s',
      paddingRight: '2rem',
      ...focusVisible('neutral', {
        focus: { bg: '$action.neutral.tertiaryHover' },
      }),

      ':disabled': {
        color: '$disabled',
        cursor: 'not-allowed',
        '+ * > svg': {
          color: '$disabled',
        },
      },

      ':hover:not(:disabled)': {
        bg: '$action.neutral.tertiaryHover',
      },
    },
  },

  error: {
    false: {},
    true: {
      ...focusVisible('critical'),
      border: '$form.critical',
    },
  },

  selected: {
    false: { color: '$secondary' },
    true: { color: '$form.neutral' },
  },
})

export const caret = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  pointerEvents: 'none',
})

export const caretVariants = styleVariants({
  variant: {
    default: {
      right: '1rem',
      height: '1.25rem',
    },
    inline: {
      right: '0.75rem',
      height: '1rem',
    },
  },
})

export const container = styleVariants({
  variant: {
    default: {
      position: 'relative',
      width: '100%',
    },
    inline: {
      position: 'relative',
      width: 'fit-content',
    },
  },
})

export const bleed = styleVariants({
  bleedY: {
    true: {
      marginY: '$-m',
    },
    false: {},
  },
  bleedX: {
    true: { marginX: '$-m' },
    false: {},
  },
})
