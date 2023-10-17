import { csx, dataAttr } from '@vtex/admin-ui-core'

const height = '2.75rem'

export const containerTheme = csx({
  height,
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  text: '$body',
  border: '$form.neutral',
  borderRadius: '$base',
  bg: '$form.neutral',
  cursor: 'text',
  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus-within': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
  [dataAttr('error', true)]: {
    border: '$form.critical',
    ':hover': {
      border: '$form.criticalHover',
    },
    ':focus-within': {
      border: '$form.criticalFocus',
      boxShadow: '$ring.critical',
    },
  },
  [dataAttr('disabled', true)]: {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
    ':hover': {
      border: '$disabled',
    },
  },
})

export const inputTheme = csx({
  height,
  padding: '$space-3 $space-4',
  width: '100%',
  borderRadius: '$base',
  bg: '$form.neutral',
  ':focus': {
    outline: 'none',
  },
})

export const termTheme = csx({
  padding: '$space-3 $space-4',
  color: '$secondary',
  display: 'flex',
  alignItems: 'center',
  [dataAttr('type', 'prefix')]: {
    borderRight: '$form.neutral',
  },
  [dataAttr('type', 'suffix')]: {
    borderLeft: '$form.neutral',
  },
})
