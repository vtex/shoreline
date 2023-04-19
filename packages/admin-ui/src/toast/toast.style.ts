import { csx, dataAttr } from '@vtex/admin-ui-core'

export const animation = {
  timeoutMs: 300,
  enterTransition: 'transform 0.2s ease, opacity 0.2s ease',
  leaveTransition: 'opacity 0.1s ease',
}

export const toastContainerTheme = csx({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',
  size: 'auto',
  padding: '$space-4 $space-5',
  pointerEvents: 'all',
  overflow: 'hidden',
  borderRadius: '$base',
  [dataAttr('variant', 'critical')]: {
    bg: '$critical',
    border: '$critical',
  },
  [dataAttr('variant', 'positive')]: {
    bg: '$positive',
    border: '$positive',
  },
  [dataAttr('variant', 'warning')]: {
    bg: '$warning',
    border: '$warning',
  },
  [dataAttr('variant', 'info')]: {
    bg: '$info',
    border: '$info',
  },
})

export const toastQueueTheme = csx({
  position: 'fixed',
  zIndex: '$z-10',
  pointerEvents: 'none',
  bottom: '$space-10',
  marginLeft: 'auto',
  width: '100%',
  '@tablet': {
    right: '$space-12',
    width: 'auto',
  },
})

export const toastInfoTheme = csx({
  width: '16rem',
})

export const toastMessageTheme = csx({
  textAlign: 'start',
  text: '$body',
})
