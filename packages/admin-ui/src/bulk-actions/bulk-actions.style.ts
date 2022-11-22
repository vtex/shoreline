import { style } from '@vtex/admin-ui-core'

export const innerContainer = style({
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: '$space-3',
})

export const container = style({
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '$space-4 $space-5',
  bg: '$primary',
  border: '$neutral',
  borderRadius: '$border-radius-base',
  boxShadow: '$overlay.center',
  marginX: 'auto',
})

export const baseline = style({
  width: '100%',
  position: 'fixed',
  bottom: '$space-6',
  left: '$space-0',
  pointerEvents: 'none',
  '> *': {
    pointerEvents: 'auto',
  },
  zIndex: 999,
})
