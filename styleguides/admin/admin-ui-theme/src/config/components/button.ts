/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha } from '@vtex/admin-ui-system'

const size = {
  regular: {
    fontSize: 1,
    height: 40,
    width: 'auto',
    paddingLeft: 4,
    paddingRight: 4,
  },
  'regular-icon': {
    fontSize: 1,
    height: 40,
    width: 40,
    paddingLeft: 1,
    paddingRight: 1,
    svg: {
      width: 24,
      minWidth: 24,
      height: 24,
      minHeight: 24,
      margin: 1,
    },
  },
  'regular-icon-start': {
    fontSize: 1,
    height: 40,
    width: 'auto',
    paddingLeft: 2,
    paddingRight: 3,
    svg: {
      width: 24,
      minWidth: 24,
      height: 24,
      minHeight: 24,
      margin: 1,
    },
  },
  'regular-icon-end': {
    fontSize: 1,
    height: 40,
    width: 'auto',
    paddingLeft: 3,
    paddingRight: 2,
    svg: {
      width: 24,
      minWidth: 24,
      height: 24,
      minHeight: 24,
      margin: 1,
    },
  },
  small: {
    fontSize: 0,
    height: 32,
    width: 'auto',
    paddingLeft: 3,
    paddingRight: 3,
  },
  'small-icon': {
    fontSize: 0,
    height: 32,
    width: 32,
    paddingLeft: '2px',
    paddingRight: '2px',
    svg: {
      width: 20,
      minWidth: 20,
      height: 20,
      minHeight: 20,
      margin: 1,
    },
  },
  'small-icon-start': {
    fontSize: 0,
    height: 32,
    width: 'auto',
    paddingLeft: 2,
    paddingRight: 3,
    svg: {
      width: 20,
      minWidth: 20,
      height: 20,
      minHeight: 20,
      margin: 1,
    },
  },
  'small-icon-end': {
    fontSize: 0,
    height: 32,
    width: 'auto',
    paddingLeft: 3,
    paddingRight: 2,
    svg: {
      width: 20,
      minWidth: 20,
      height: 20,
      minHeight: 20,
      margin: 1,
    },
  },
}

const variant = {
  primary: {
    color: 'light.primary',
    backgroundColor: 'blue',
    ':hover': {
      backgroundColor: 'blue.hover',
    },
    ':active': {
      backgroundColor: 'blue.pressed',
    },
    ':disabled': {
      color: 'dark.primary',
      backgroundColor: 'mid.secondary',
    },
  },
  secondary: {
    backgroundColor: 'blue.secondary',
    color: 'blue',
    ':hover': {
      backgroundColor: 'blue.secondary.hover',
    },
    ':active': {
      backgroundColor: 'blue.secondary.pressed',
    },
    ':disabled': {
      color: 'mid.primary',
      backgroundColor: 'light.secondary',
    },
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: 'blue',
    ':hover': {
      color: 'blue.hover',
      backgroundColor: alpha('blue.secondary.hover', 0.24),
    },
    ':active': {
      color: 'blue.pressed',
      backgroundColor: alpha('blue.secondary.pressed', 0.32),
    },
    ':disabled': {
      color: 'mid.primary',
    },
  },
  danger: {
    color: 'light.primary',
    backgroundColor: 'red',
    ':hover': {
      backgroundColor: 'red.hover',
    },
    ':active': {
      backgroundColor: 'red.pressed',
    },
    ':disabled': {
      color: 'dark.primary',
      backgroundColor: 'mid.secondary',
    },
  },
  'danger-secondary': {
    backgroundColor: 'red.secondary',
    color: 'red',
    ':hover': {
      backgroundColor: 'red.secondary.hover',
      color: 'red.hover',
    },
    ':active': {
      backgroundColor: 'red.secondary.pressed',
      color: 'red.pressed',
    },
    ':disabled': {
      color: 'mid.primary',
      backgroundColor: 'light.secondary',
    },
  },
  'danger-tertiary': {
    backgroundColor: 'transparent',
    color: 'red',
    ':hover': {
      color: 'red.hover',
      backgroundColor: alpha('red.secondary.hover', 0.24),
    },
    ':active': {
      color: 'red.pressed',
      backgroundColor: alpha('red.secondary.pressed', 0.32),
    },
    ':disabled': {
      color: 'mid.primary',
    },
  },
  'adaptative-dark': {
    color: 'currentColor',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: alpha('dark.primary', 0.04),
    },
    ':active': {
      backgroundColor: alpha('dark.primary', 0.08),
    },
    ':disabled': {
      color: 'mid.primary',
    },
  },
  'adaptative-light': {
    color: 'currentColor',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: alpha('light.primary', 0.04),
    },
    ':active': {
      backgroundColor: alpha('light.primary', 0.08),
    },
    ':disabled': {
      color: 'mid.primary',
    },
  },
}

const styles = {
  fontFamily: 'sans',
  fontSettings: 'regular',
  border: 'none',
  borderRadius: 'default',
  cursor: 'pointer',
  position: 'relative',
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
}

export default {
  ...Object.keys(variant).reduce(function mergeV(acc, v) {
    return {
      ...acc,
      ...Object.keys(size).reduce(function mergeS(bcc, s) {
        return {
          ...bcc,
          [`${v}-${s}`]: {
            ...styles,
            ...(variant as any)[v],
            ...(size as any)[s],
          },
        }
      }, []),
    }
  }, {}),
}
