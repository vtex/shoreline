import { focusVisible, ring, dataAttr, csx } from '@vtex/admin-ui-core'

export const selectTheme = csx({
  borderRadius: '$base',
  appearance: 'none',
  cursor: 'pointer',
  bg: '$form.neutral',
  width: '100%',
  text: '$body',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '> option': {
    color: 'currentColor',
  },
  '+ * > svg': {
    color: '$secondary',
  },
  boxSizing: 'border-box',
  height: '2.75rem',
  paddingLeft: '1rem',
  paddingRight: '2.5rem',
  border: '$form.neutral',
  ...focusVisible('neutral', {
    focus: { border: '$form.neutralFocus' },
    polyfill: { boxShadow: ring('neutral') },
  }),

  ':hover:not(:disabled)': {
    border: '$form.neutralHover',
  },

  [dataAttr('error', 'true')]: {
    ...focusVisible('critical', {
      focus: { border: '$form.criticalFocus' },
      polyfill: { boxShadow: ring('critical') },
    }),
    border: '$form.critical',

    ':hover:not(:disabled)': {
      border: '$form.criticalHover',
    },
  },
  [dataAttr('selected', 'false')]: { fg: '$secondary' },
  [dataAttr('selected', 'true')]: { fg: '$form.neutral' },

  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
    cursor: 'not-allowed',
    opacity: 1,
    '+ * > svg': {
      color: '$disabled',
    },
  },
})

export const caretTheme = csx({
  position: 'absolute',
  top: '$space-0',
  bottom: '$space-0',
  margin: 'auto',
  pointerEvents: 'none',
  right: '1rem',
  height: '1.25rem',
})

export const containerTheme = csx({
  position: 'relative',
  width: '100%',
})
