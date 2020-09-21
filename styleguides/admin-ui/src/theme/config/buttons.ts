/* eslint-disable @typescript-eslint/no-explicit-any */
const size = {
  regular: {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 'auto',
    paddingLeft: 9,
    paddingRight: 9,
  },
  'regular-icon': {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 12,
    paddingLeft: 3,
    paddingRight: 3,
  },
  'regular-icon-start': {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 'auto',
    paddingLeft: 5,
    paddingRight: 7,
  },
  'regular-icon-end': {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 'auto',
    paddingLeft: 7,
    paddingRight: 5,
  },
  small: {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 'auto',
    paddingLeft: 7,
    paddingRight: 7,
  },
  'small-icon': {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  'small-icon-start': {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 'auto',
    paddingLeft: 5,
    paddingRight: 7,
  },
  'small-icon-end': {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 'auto',
    paddingLeft: 7,
    paddingRight: 5,
  },
}

const variant = {
  'filled-primary': {
    textTransform: 'uppercase',
    color: 'primary.contrast',
    backgroundColor: 'primary.base',
    fontVariationSettings: "'wght' 92",
    borderColor: 'primary.base',
    '&:hover': {
      backgroundColor: 'primary.hover',
      borderColor: 'primary.hover',
    },
    '&:active': {
      backgroundColor: 'primary.active',
      borderColor: 'primary.active',
    },
    '&:disabled': {
      color: 'text',
      borderColor: 'muted.2',
      backgroundColor: 'muted.2',
    },
  },
  'outlined-primary': {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    borderColor: 'muted.2',
    color: 'primary.base',
    fontVariationSettings: "'wght' 92",
    '&:hover': {
      backgroundColor: 'primary.washed',
      color: 'primary.hover',
    },
    '&:active': {
      color: 'primary.active',
    },
    '&:disabled': {
      color: 'muted.1',
      backgroundColor: 'muted.4',
    },
  },
  'subtle-primary': {
    borderColor: 'transparent',
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'primary.base',
    fontVariationSettings: "'wght' 92",
    '&:hover': {
      color: 'primary.hover',
      backgroundColor: 'primary.washed',
    },
    '&:active': {
      color: 'primary.active',
      backgroundColor: 'primary.washed',
    },
    '&:disabled': {
      color: 'muted.1',
    },
  },
  'filled-danger': {
    textTransform: 'uppercase',
    color: 'danger.contrast',
    backgroundColor: 'danger.base',
    fontVariationSettings: "'wght' 92",
    borderColor: 'danger.base',
    '&:hover': {
      borderColor: 'danger.hover',
      backgroundColor: 'danger.hover',
    },
    '&:active': {
      borderColor: 'danger.active',
      backgroundColor: 'danger.active',
    },
    '&:disabled': {
      borderColor: 'muted.2',
      color: 'text',
      backgroundColor: 'muted.2',
    },
  },
  'outlined-danger': {
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    borderColor: 'muted.2',
    color: 'danger.base',
    fontVariationSettings: "'wght' 92",
    '&:hover': {
      backgroundColor: 'danger.washed',
      color: 'danger.hover',
    },
    '&:active': {
      color: 'danger.active',
    },
    '&:disabled': {
      color: 'muted.1',
      backgroundColor: 'muted.4',
    },
  },
  'subtle-danger': {
    borderColor: 'transparent',
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'danger.base',
    fontVariationSettings: "'wght' 92",
    '&:hover': {
      color: 'danger.hover',
      backgroundColor: 'danger.washed',
    },
    '&:active': {
      color: 'danger.active',
      backgroundColor: 'danger.washed',
    },
    '&:disabled': {
      color: 'muted.1',
    },
  },
}

const styles = {
  borderWidth: 1,
  borderRadius: 3,
  cursor: 'pointer',
  position: 'relative',
  borderStyle: 'solid',
  '&:focus': {
    outline: 'none',
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
