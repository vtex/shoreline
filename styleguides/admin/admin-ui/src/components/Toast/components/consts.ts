import { StyleObject } from '@vtex/admin-core'

/**
 * Toaster styles
 */
export const toasterCsx: StyleObject = {
  position: 'fixed',
  bottom: '3rem',
  zIndex: 'over',
  left: 0,
  right: '2rem',
  textAlign: 'center',
  marginLeft: 'auto',
  maxWidth: '23.375rem',
  minHeight: '4.5rem',
  listStyle: 'none',
  '> *:not(:last-child)': {
    marginBottom: '0.75rem',
  },
}

// Important! Although these hexes below
// are "hardcoded" and don't correspond to
// any color defined on the Design System
// level, they were defined on the component
// level and share the same styles with the
// Alert component. We're actively discussing
// how we can include these colors on the Design
// System level.

/**
 * Styles of toast of `error` type
 */
export const toastErrorCsx: StyleObject = {
  backgroundColor: '#FFF8F8',
  borderColor: '#EDB6B6',
}

/**
 * Styles of toast of `warning` type
 */
export const toastWarningCsx: StyleObject = {
  backgroundColor: '#FFF9EE',
  borderColor: '#E5C38E',
}

/**
 * Styles of toast of `success` type
 */
export const toastSuccessCsx: StyleObject = {
  backgroundColor: '#F0F8F5',
  borderColor: '#8FC2B1',
}
