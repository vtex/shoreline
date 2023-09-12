import { csx } from '@vtex/admin-ui-core'

export const innerContainerTheme = csx({
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: '$space-3',
})

export const containerTheme = csx({
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  padding: '$space-4 $space-5',
  bg: '$primary',
  border: '$neutral',
  borderRadius: '$base',
  boxShadow: '$overlay.center',
  marginX: 'auto',
})

export const baselineTheme = csx({
  width: '100%',
  position: 'fixed',
  bottom: '$space-6',
  left: '$space-0',
  pointerEvents: 'none',
  '> *': {
    pointerEvents: 'auto',
  },
  zIndex: '$z-5',
})
