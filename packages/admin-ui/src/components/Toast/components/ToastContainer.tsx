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
    type: {
      error: {
        bg: '#FFF8F8',
        borderColor: '#EDB6B6',
      },
      success: { bg: '#F0F8F5', borderColor: '#8FC2B1' },
      warning: { bg: '#FFF9EE', borderColor: '#E5C38E' },
      info: { bg: 'light.primary' },
    },
  },
})

ToastContainer.defaultProps = {
  type: 'info',
}
