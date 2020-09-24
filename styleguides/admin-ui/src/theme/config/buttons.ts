import space from './space'
import colors from './colors'

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
    svg: {
      width: 8,
      minWidth: 8,
      height: 8,
      minHeight: 8,
      margin: 3,
    },
  },
  'regular-icon-start': {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 'auto',
    paddingLeft: 5,
    paddingRight: 7,
    svg: {
      width: 8,
      minWidth: 8,
      height: 8,
      minHeight: 8,
      margin: 3,
    },
  },
  'regular-icon-end': {
    paddingY: 5,
    fontSize: 1,
    height: 12,
    width: 'auto',
    paddingLeft: 7,
    paddingRight: 5,
    svg: {
      width: 8,
      minWidth: 8,
      height: 8,
      minHeight: 8,
      margin: 3,
    },
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
    svg: {
      width: 7,
      minWidth: 7,
      height: 7,
      minHeight: 7,
      margin: 3,
    },
  },
  'small-icon-start': {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 'auto',
    paddingLeft: 5,
    paddingRight: 7,
    svg: {
      width: 7,
      minWidth: 7,
      height: 7,
      minHeight: 7,
      margin: 3,
    },
  },
  'small-icon-end': {
    paddingY: 4,
    fontSize: 0,
    height: 10,
    width: 'auto',
    paddingLeft: 7,
    paddingRight: 5,
    svg: {
      width: 7,
      minWidth: 7,
      height: 7,
      minHeight: 7,
      margin: 3,
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
    boxShadow: `0rem 0rem 0rem ${space[2]} ${colors.focus}`,
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
