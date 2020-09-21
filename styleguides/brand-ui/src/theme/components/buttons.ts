/* eslint-disable @typescript-eslint/no-explicit-any */
const styles = {
  textTransform: 'uppercase',
  fontWeight: 'medium',
  borderWidth: 1,
  borderRadius: 3,
  fontSize: 1,
  cursor: 'pointer',
  position: 'relative',
  border: 'none',
  lineHeight: 1,
  '&:focus': {
    outline: 'none',
  },
  '&:disabled': {
    color: 'white',
    backgroundColor: 'muted.2',
  },
}

const variant = {
  primary: {
    color: 'primary.contrast',
    backgroundColor: 'primary.base',
    '&:hover': {
      backgroundColor: 'primary.hover',
    },
    '&:active': {
      backgroundColor: 'primary.active',
    },
  },
  secondary: {
    color: 'secondary.contrast',
    backgroundColor: 'secondary.base',
    '&:hover': {
      backgroundColor: 'secondary.hover',
    },
    '&:active': {
      backgroundColor: 'secondary.active',
    },
  },
  tertiary: {
    color: 'secondary.base',
    backgroundColor: 'transparent',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:active': {
      textDecoration: 'underline',
    },
    '&:disabled': {
      color: 'muted.2',
      backgroundColor: 'transparent',
    },
  },
}

const size = {
  regular: {
    height: 48,
    paddingX: 5,
  },
  small: {
    height: 32,
    paddingX: 4,
  },
  'icon-regular': {
    height: 48,
    paddingX: 4,
  },
  'icon-small': {
    height: 32,
    paddingX: 3,
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
