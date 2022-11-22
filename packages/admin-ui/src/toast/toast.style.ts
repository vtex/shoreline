import { style, styleVariants } from '@vtex/admin-ui-core'

export const animation = {
  timeoutMs: 300,
  enterTransition: 'transform 0.2s ease, opacity 0.2s ease',
  leaveTransition: 'opacity 0.1s ease',
}

export const toastContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',
  size: 'auto',
  padding: '$space-4 $space-5',
  pointerEvents: 'all',
  overflow: 'hidden',
  borderRadius: '$border-radius-base',
})

export const toastContainerVariants = styleVariants({
  variant: {
    critical: {
      bg: '$critical',
      border: '$critical',
    },
    positive: {
      bg: '$positive',
      border: '$positive',
    },
    warning: {
      bg: '$warning',
      border: '$warning',
    },
    info: {
      bg: '$info',
      border: '$info',
    },
  },
})

export const toastQueue = style({
  position: 'fixed',
  zIndex: '999',
  pointerEvents: 'none',
  bottom: '$space-10',
  marginLeft: 'auto',
  width: '100%',
  '@tablet': {
    right: '$space-12',
    width: 'auto',
  },
})

export const toastInfo = style({
  width: '16rem',
})

export const toastMessage = style({
  textAlign: 'start',
  text: '$body',
})
