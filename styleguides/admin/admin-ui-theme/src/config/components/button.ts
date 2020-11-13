/* eslint-disable @typescript-eslint/no-explicit-any */
import { lighten } from '@vtex/admin-ui-system'

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
    fontVariationSettings: "'wght' 92",
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
    fontVariationSettings: "'wght' 92",
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
    fontVariationSettings: "'wght' 92",
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
    fontVariationSettings: "'wght' 92",
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
    fontVariationSettings: "'wght' 92",
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
    fontVariationSettings: "'wght' 92",
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
  text: {
    backgroundColor: 'transparent',
    color: 'text.primary',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      color: 'text.primary',
      backgroundColor: lighten('text.primary', 0.72),
    },
    ':active': {
      color: 'text.primary',
      backgroundColor: lighten('text.primary', 0.68),
    },
    ':disabled': {
      color: 'muted.0',
    },
  },
}

const styles = {
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
