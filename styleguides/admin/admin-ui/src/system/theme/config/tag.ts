/* eslint-disable @typescript-eslint/no-explicit-any */
import { rgba } from 'polished'

import colors from './colors'

const buttonStyles = {
  padding: 0,
  border: 'none',
  borderRadius: 3,
  cursor: 'pointer',
  position: 'relative',
  color: 'currentColor',
  backgroundColor: 'transparent',
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
  marginLeft: '1',
}

const styles = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  color: 'text',
  border: 'none',
  '> svg:nth-of-type(1)': {
    marginRight: 1,
  },
}

const pallete = {
  primary: {
    bg: 'primary.washed.0',
  },
  success: {
    bg: 'success.washed.0',
  },
  danger: {
    bg: 'danger.washed.0',
  },
  base: {
    bg: 'text',
    color: 'background',
  },
  warning: {
    bg: 'warning.washed.0',
  },
  purple: {
    bg: 'purple.washed.0',
  },
}

const size = {
  small: {
    height: 26,
    paddingX: '2',
    lineHeight: 'small',
    fontVariationSettings: "'wght' 80",
    fontWeight: 400,
    fontSize: 0,
    svg: {
      width: 16,
      height: 16,
      minWidth: 16,
      minHeight: 16,
    },
    button: {
      height: 16,
      width: 16,
    },
  },
  regular: {
    height: 40,
    paddingX: '4',
    lineHeight: 'subtitle',
    fontVariationSettings: "'wght' 92",
    fontWeight: 500,
    fontSize: 2,
    svg: {
      width: 20,
      minWidth: 20,
      height: 20,
      minHeight: 20,
    },
    button: {
      height: 20,
      width: 20,
    },
  },
}

export default {
  ...Object.keys(pallete).reduce(function mergeV(acc, p) {
    return {
      ...acc,
      ...Object.keys(size).reduce(function mergeS(bcc, s) {
        return {
          ...bcc,
          [`${p}-${s}`]: {
            ...styles,
            ...(pallete as any)[p],
            ...(size as any)[s],
          },
        }
      }, []),
    }
  }, {}),
  'default-button': {
    ...buttonStyles,
    '&:hover': {
      backgroundColor: rgba(colors.text, 0.1),
    },
    '&:active': {
      backgroundColor: rgba(colors.text, 0.13),
    },
  },
  'base-button': {
    ...buttonStyles,
    '&:hover': {
      backgroundColor: rgba(colors.background, 0.1),
    },
    '&:active': {
      backgroundColor: rgba(colors.background, 0.13),
    },
  },
}
