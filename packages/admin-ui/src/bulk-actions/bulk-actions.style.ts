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
})

export const baseline = style({
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  width: '100%',
  position: 'fixed',
  bottom: 25,
  left: 0,
})
