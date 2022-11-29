import { csx } from '@vtex/admin-ui'

export const wrapperTheme = csx({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

export const fieldTheme = csx({
  display: 'inline-flex',
  padding: '$space-2 $space-4',
  borderRadius: '$default',
  border: '$form.neutral',
  bg: '$primary',
  ':focus-within': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
})

export const dateSegmentTheme = csx({
  text: '$body',
  marginX: '$space-1',
  borderRadius: '$default',
  textTransform: 'uppercase',
  '[data-is-placeholder=true]': {
    color: '$secondary',
  },
  ':focus-visible': {
    outline: 'none',
    boxShadow: '$ring.neutral',
  },
})
