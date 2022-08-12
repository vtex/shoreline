import { style } from '@vtex/admin-ui-core'

export const innerContainer = style({
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: '$l',
})

export const container = style({
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '$l',
  bg: '$primary',
  border: '$neutral',
  borderRadius: '$default',
  boxShadow: '$overlay.center',
  marginX: 'auto',
})

export const baseline = style({
  width: '100%',
  position: 'fixed',
  bottom: '$2xl',
  left: 0,
  pointerEvents: 'none',
  '> *': {
    pointerEvents: 'auto',
  },
  zIndex: 999,
})
