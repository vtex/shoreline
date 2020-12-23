/* eslint-disable @typescript-eslint/no-explicit-any */

const styles = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '100px',
  color: 'dark.primary',
  border: 'none',
  '> svg:nth-of-type(1)': {
    marginRight: 1,
  },
}

const palette = {
  blue: {
    bg: 'blue.secondary',
  },
  green: {
    bg: 'green.secondary',
  },
  red: {
    bg: 'red.secondary',
  },
  black: {
    bg: 'dark.primary',
    color: 'light.primary',
  },
  yellow: {
    bg: 'yellow.secondary',
  },
  purple: {
    bg: '#E4E0F0',
  },
}

const size = {
  small: {
    height: 26,
    paddingX: '2',
    lineHeight: 'small',
    fontSettings: "'wght' 80",
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
    fontSettings: 'regular',
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
  ...Object.keys(palette).reduce(function mergeV(acc, p) {
    return {
      ...acc,
      ...Object.keys(size).reduce(function mergeS(bcc, s) {
        return {
          ...bcc,
          [`${p}-${s}`]: {
            ...styles,
            ...(palette as any)[p],
            ...(size as any)[s],
          },
        }
      }, []),
    }
  }, {}),
}
