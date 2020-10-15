/* eslint-disable @typescript-eslint/no-explicit-any */
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
  'filled-primary': {
    textTransform: 'uppercase',
    color: 'primary.contrast',
    backgroundColor: 'primary.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      backgroundColor: 'primary.hover',
    },
    ':active': {
      backgroundColor: 'primary.active',
    },
    ':disabled': {
      color: 'text',
      backgroundColor: 'muted.2',
    },
  },
  'subtle-primary': {
    textTransform: 'uppercase',
    backgroundColor: 'primary.washed.0',
    color: 'primary.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      backgroundColor: 'primary.washed.1',
      color: 'primary.hover',
    },
    ':active': {
      backgroundColor: 'primary.washed.2',
      color: 'primary.active',
    },
    ':disabled': {
      color: 'muted.1',
      backgroundColor: 'muted.4',
    },
  },
  'text-primary': {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'primary.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      color: 'primary.hover',
      backgroundColor: 'primary.washed.1',
    },
    ':active': {
      color: 'primary.active',
      backgroundColor: 'primary.washed.2',
    },
    ':disabled': {
      color: 'muted.1',
    },
  },
  'filled-danger': {
    textTransform: 'uppercase',
    color: 'danger.contrast',
    backgroundColor: 'danger.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      backgroundColor: 'danger.hover',
    },
    ':active': {
      backgroundColor: 'danger.active',
    },
    ':disabled': {
      color: 'text',
      backgroundColor: 'muted.2',
    },
  },
  'subtle-danger': {
    textTransform: 'uppercase',
    backgroundColor: 'danger.washed.0',
    color: 'danger.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      backgroundColor: 'danger.washed.1',
      color: 'danger.hover',
    },
    ':active': {
      backgroundColor: 'danger.washed.2',
      color: 'danger.active',
    },
    ':disabled': {
      color: 'muted.1',
      backgroundColor: 'muted.4',
    },
  },
  'text-danger': {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    color: 'danger.base',
    fontVariationSettings: "'wght' 92",
    ':hover': {
      color: 'danger.hover',
      backgroundColor: 'danger.washed.1',
    },
    ':active': {
      color: 'danger.active',
      backgroundColor: 'danger.washed.2',
    },
    ':disabled': {
      color: 'muted.1',
    },
  },
}

const styles = {
  border: 'none',
  borderRadius: 3,
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
