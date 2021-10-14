import { jsx } from '@vtex/admin-ui-react'

export const ToastContainer = jsx('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '16.125rem',
  width: 'auto',
  minHeight: '4.5rem',
  height: 'auto',
  maxHeight: '4.5rem',
  padding: '1rem',
  boxShadow: 'subtle',
  border: 'default',
  pointerEvents: 'all',
  overflow: 'hidden',
  paddingY: '4',
  color: 'dark.primary',
  borderRadius: 'default',
  variants: {
    tone: {
      critical: {
        bg: 'notification.critical',
        borderColor: 'notification.critical',
      },
      positive: {
        bg: 'notification.positive',
        borderColor: 'notification.positive',
      },
      warning: {
        bg: 'notification.warning',
        borderColor: 'notification.warning',
      },
      info: { bg: 'notification.info', borderColor: 'notification.info' },
    },
  },
})

ToastContainer.defaultProps = {
  tone: 'info',
}
