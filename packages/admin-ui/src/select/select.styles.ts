import { style, styleVariants, focusVisible, ring } from '@vtex/admin-ui-core'

export const baseline = style({
  borderRadius: 'default',
  appearance: 'none',
  cursor: 'pointer',
  bg: '$form.neutral',
  width: '100%',
  text: '$body',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '+ * > svg': {
    color: '$secondary',
  },
  boxSizing: 'border-box',
  height: '2.75rem',
  padding: '$m',
  paddingRight: '2.5rem',
  border: '$form.neutral',
  ...focusVisible('neutral', { polyfill: { boxShadow: ring('neutral') } }),

  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
    cursor: 'not-allowed',
    '+ * > svg': {
      color: '$disabled',
    },
  },

  ':hover:not(:disabled)': {
    border: '$form.neutralHover',
  },
})

export const variants = styleVariants({
  error: {
    false: {},
    true: {
      ...focusVisible('critical', {
        polyfill: { boxShadow: ring('critical') },
      }),
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
  right: '1rem',
  height: '1.25rem',
})

export const container = style({
  position: 'relative',
  width: '100%',
})
