import { style, styleVariants } from '@vtex/admin-ui-core'

export const toastContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'space-between',
  size: 'auto',
  padding: '$l',
  pointerEvents: 'all',
  overflow: 'hidden',
  borderRadius: '$default',
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
  bottom: '$3xl',
  marginLeft: 'auto',
  width: '100%',
  '@tablet': {
    right: '$3xl',
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
