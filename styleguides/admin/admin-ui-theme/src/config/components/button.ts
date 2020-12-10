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
    textTransform: 'uppercase',
    color: 'primary.accent',
    backgroundColor: 'primary.base',
    ':hover': {
      backgroundColor: 'primary.hover',
    },
    ':active': {
      backgroundColor: 'primary.pressed',
    },
    ':disabled': {
      color: 'text.primary',
      backgroundColor: 'muted.1',
    },
  },
  secondary: {
    textTransform: 'uppercase',
    backgroundColor: 'secondary.base',
    color: 'secondary.accent',
    ':hover': {
      backgroundColor: 'secondary.hover',
    },
    ':active': {
      backgroundColor: 'secondary.pressed',
    },
    ':disabled': {
      color: 'muted.0',
      backgroundColor: 'muted.3',
    },
  },
  tertiary: {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'primary.base',
    ':hover': {
      color: 'primary.hover',
      backgroundColor: 'secondary.hover',
    },
    ':active': {
      color: 'primary.pressed',
      backgroundColor: 'secondary.pressed',
    },
    ':disabled': {
      color: 'muted.0',
    },
  },
  danger: {
    textTransform: 'uppercase',
    color: 'danger.accent',
    backgroundColor: 'danger.base',
    ':hover': {
      backgroundColor: 'danger.hover',
    },
    ':active': {
      backgroundColor: 'danger.pressed',
    },
    ':disabled': {
      color: 'text.primary',
      backgroundColor: 'muted.1',
    },
  },
  'danger-secondary': {
    textTransform: 'uppercase',
    backgroundColor: 'danger.washed.base',
    color: 'danger.base',
    ':hover': {
      backgroundColor: 'danger.washed.hover',
      color: 'danger.hover',
    },
    ':active': {
      backgroundColor: 'danger.washed.pressed',
      color: 'danger.pressed',
    },
    ':disabled': {
      color: 'muted.0',
      backgroundColor: 'muted.3',
    },
  },
  'danger-tertiary': {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'danger.washed.accent',
    ':hover': {
      color: 'danger.hover',
      backgroundColor: 'danger.washed.hover',
    },
    ':active': {
      color: 'danger.pressed',
      backgroundColor: 'danger.washed.pressed',
    },
    ':disabled': {
      color: 'muted.0',
    },
  },
  'adaptative-dark': {
    color: 'currentColor',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: alpha('text.primary', 0.04),
    },
    ':active': {
      backgroundColor: alpha('text.primary', 0.08),
    },
    ':disabled': {
      color: 'muted.0',
    },
  },
  'adaptative-light': {
    color: 'currentColor',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: alpha('background', 0.04),
    },
    ':active': {
      backgroundColor: alpha('background', 0.08),
    },
    ':disabled': {
      color: 'muted.0',
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
