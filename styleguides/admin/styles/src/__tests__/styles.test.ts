import get from 'lodash.get'
import { styles } from '../styles'
import { Theme } from '../types'

describe('component tests', () => {
  it('should allow object themeKey', () => {
    const themeWithComponents: Theme = {
      colors: {
        primary: 'blue',
        danger: 'red',
        light: 'white',
      },
      components: {
        button: {
          styles: {
            fontWeight: '500',
          },
          size: {
            styles: {
              margin: '1px',
            },
            small: {
              padding: '2px',
            },
            regular: {
              padding: '3px',
            },
          },
          variant: {
            styles: {
              color: 'light',
            },
            primary: {
              bg: 'primary',
            },
            danger: {
              bg: 'danger',
            },
          },
        },
      },
    }

    const result = styles({
      themeKey: {
        button: { size: 'small', variant: 'primary' },
      },
    })(themeWithComponents)

    expect(result).toEqual({
      fontWeight: '500',
      margin: '1px',
      padding: '2px',
      color: 'white',
      backgroundColor: 'blue',
    })
  })
})

describe('styles invalid tests', () => {
  it('returns a function', () => {
    const result = styles()

    expect(typeof result).toBe('function')
  })

  it('returns an object', () => {
    const result = styles()()

    expect(typeof result).toBe('object')
  })

  it('returns styles', () => {
    const result = styles({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    })()

    expect(result).toEqual({
      fontSize: 32,
      color: 'blue',
      borderRadius: 4,
    })
  })
})

describe('theme parse', () => {
  const theme: Theme = {
    colors: {
      primary: 'blue',
      secondary: 'cyan',
      background: 'white',
      text: 'black',
    },
    fontSizes: [12, 14, 16, 24, 36],
    fonts: {
      monospace: 'Menlo, monospace',
    },
    lineHeights: {
      body: 1.5,
    },
    fontWeights: {
      bold: 600,
    },
    sizes: {
      small: 4,
      medium: 8,
      large: 16,
      sidebar: 320,
    },
    buttons: {
      primary: {
        padding: 3,
        fontWeight: 'bold',
        color: 'white',
        bg: 'primary',
        borderRadius: 2,
      },
    },
    text: {
      action: {
        fontSize: [1, 2],
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
      title: {
        fontSize: [3, 4],
        letterSpacing: ['-0.01em', '-0.02em'],
      },
    },
    border: {
      default: {
        borderStyle: 'solid',
        borderWidth: 'thin',
        borderColor: 'primary',
      },
    },
    borderWidths: {
      thin: 1,
    },
    borderStyles: {
      thick: 'solid',
    },
    borderRadius: {
      small: 5,
    },
    opacities: [0, '50%'],
    transitions: {
      standard: '0.3s ease-in-out',
    },
  }

  it('returns system props styles', () => {
    const result = styles({
      color: 'primary',
      fontSize: [2, 3, 4],
    })(theme)

    expect(result).toEqual({
      fontSize: 16,
      '@media screen and (min-width: 640px)': {
        fontSize: 24,
      },
      '@media screen and (min-width: 768px)': {
        fontSize: 36,
      },
      color: 'blue',
    })
  })

  it('returns nested system props styles', () => {
    const result = styles({
      color: 'primary',
      '&:hover': {
        color: 'secondary',
      },
    })(theme)

    expect(result).toEqual({
      color: 'blue',
      '&:hover': {
        color: 'cyan',
      },
    })
  })

  it('returns nested responsive styles', () => {
    const result = styles({
      color: 'primary',
      h1: {
        paddingY: [3, 4],
      },
    })(theme)

    expect(result).toEqual({
      color: 'blue',
      h1: {
        paddingTop: 16,
        paddingBottom: 16,
        '@media screen and (min-width: 640px)': {
          paddingTop: 32,
          paddingBottom: 32,
        },
      },
    })
  })

  it('handles all core styled system props', () => {
    const result = styles({
      margin: 0,
      marginBottom: 2,
      marginX: 'auto',
      padding: 3,
      paddingY: 4,
      fontSize: 3,
      fontWeight: 'bold',
      color: 'primary',
      bg: 'secondary',
      opacity: 1,
      transition: 'standard',
      fontFamily: 'monospace',
      lineHeight: 'body',
    })(theme)

    expect(result).toEqual({
      margin: 0,
      marginBottom: 8,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 16,
      paddingTop: 32,
      paddingBottom: 32,
      color: 'blue',
      backgroundColor: 'cyan',
      opacity: '50%',
      transition: '0.3s ease-in-out',
      fontFamily: 'Menlo, monospace',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.5,
    })
  })

  it('ignores array values longer than breakpoints', () => {
    const result = styles({
      width: [32, 64, 128, 256, 512],
    })({
      breakpoints: ['32em', '40em'],
    })

    expect(result).toEqual({
      width: 32,
      '@media screen and (min-width: 32em)': {
        width: 64,
      },
      '@media screen and (min-width: 40em)': {
        width: 128,
      },
    })
  })

  it('functional values can return responsive arrays', () => {
    const result = styles({
      color: (t) => [get(t, 'colors.primary'), get(t, 'colors.secondary')],
    })(theme)

    expect(result).toEqual({
      '@media screen and (min-width: 640px)': {
        color: 'cyan',
      },
      color: 'blue',
    })
  })

  it('returns individual border styles', () => {
    const result = styles({
      borderTopWidth: 'thin',
      borderTopColor: 'primary',
      borderTopStyle: 'thick',
      borderTopLeftRadius: 'small',
      borderTopRightRadius: 'small',
      borderBottomWidth: 'thin',
      borderBottomColor: 'primary',
      borderBottomStyle: 'thick',
      borderBottomLeftRadius: 'small',
      borderBottomRightRadius: 'small',
      borderRightWidth: 'thin',
      borderRightColor: 'primary',
      borderRightStyle: 'thick',
      borderLeftWidth: 'thin',
      borderLeftColor: 'primary',
      borderLeftStyle: 'thick',
    })(theme)

    expect(result).toEqual({
      borderTopColor: 'blue',
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomColor: 'blue',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderRightColor: 'blue',
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderLeftColor: 'blue',
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
    })
  })

  it('consumes complex scales', () => {
    const result = styles({
      border: 'default',
      text: 'action',
    })(theme)

    expect(result).toEqual({
      borderColor: 'blue',
      borderWidth: 1,
      borderStyle: 'solid',
      fontSize: 14,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      '@media screen and (min-width: 640px)': {
        fontSize: 16,
      },
    })
  })

  it('flexBasis uses theme.sizes', () => {
    const style = styles({
      flexBasis: 'sidebar',
    })(theme)

    expect(style).toEqual({
      flexBasis: 320,
    })
  })

  it('fill and stroke and caretColor use theme.colors', () => {
    const style = styles({
      fill: 'primary',
      stroke: 'secondary',
      caretColor: 'primary',
    })(theme)

    expect(style).toEqual({
      fill: 'blue',
      stroke: 'cyan',
      caretColor: 'blue',
    })
  })

  it('multiples are transformed', () => {
    const style = styles({
      marginX: 2,
      marginY: 2,
      paddingX: 2,
      paddingY: 2,
      size: 'large',
    })(theme)

    expect(style).toEqual({
      marginLeft: 8,
      marginRight: 8,
      marginTop: 8,
      marginBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      width: 16,
      height: 16,
    })
  })

  it('returns outline color from theme', () => {
    const result = styles({
      outlineColor: 'primary',
    })(theme)

    expect(result).toEqual({
      outlineColor: 'blue',
    })
  })

  it('returns correct media query order', () => {
    const result = styles({
      width: ['100%', null, '50%'],
      color: ['red', 'green', 'blue'],
    })(theme)

    const keys = Object.keys(result)

    expect(keys).toEqual([
      'width',
      '@media screen and (min-width: 640px)',
      '@media screen and (min-width: 768px)',
      'color',
    ])
    expect(result).toEqual({
      width: '100%',
      '@media screen and (min-width: 640px)': {
        color: 'green',
      },
      '@media screen and (min-width: 768px)': {
        width: '50%',
        color: 'blue',
      },
      color: 'red',
    })
  })

  it('returns correct media query order 2', () => {
    const result = styles({
      flexDirection: 'column',
      justifyContent: [null, 'flex-start', 'flex-end'],
      color: 'background',
      height: '100%',
      paddingX: [2, 3, 4],
      paddingY: 4,
    })(theme)

    const keys = Object.keys(result)

    expect(keys).toEqual([
      'flexDirection',
      'justifyContent',
      '@media screen and (min-width: 640px)',
      '@media screen and (min-width: 768px)',
      'color',
      'height',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
    ])
  })

  it('supports vendor properties', () => {
    expect(styles({ WebkitOverflowScrolling: 'touch' })(theme)).toStrictEqual({
      WebkitOverflowScrolling: 'touch',
    })
  })

  it('supports default values', () => {
    const defaultTheme: Theme = {
      colors: {
        blue: {
          default: 'blue-default',
          hover: 'blue-hover',
          secondary: {
            default: 'blue-secondary-default',
            hover: 'blue-secondary-hover',
          },
        },
        red: {
          default: 'red-default',
          hover: 'red-hover',
          secondary: {
            default: 'red-secondary-default',
            hover: 'red-secondary-hover',
          },
        },
      },
    }

    const result = styles({
      bg: 'blue',
      ':hover': {
        color: 'red.secondary',
        borderColor: 'red.secondary.hover',
      },
    })(defaultTheme)

    expect(result).toStrictEqual({
      backgroundColor: 'blue-default',
      ':hover': {
        color: 'red-secondary-default',
        borderColor: 'red-secondary-hover',
      },
    })
  })

  it('supports default objects', () => {
    const defaultTheme: Theme = {
      textFont: {
        primary: {
          default: {
            lineHeight: 'default-lh',
            fontSettings: 'regular',
            fontSize: 'default-size',
          },
          highlight: {
            lineHeight: 'highlight-lh',
            fontSettings: 'regular',
            fontSize: 2,
          },
        },
      },
    }

    const result = styles({
      textFont: 'primary',
    })(defaultTheme)

    expect(result).toStrictEqual({
      lineHeight: 'default-lh',
      fontVariationSettings: 'regular',
      fontSize: 'default-size',
    })
  })

  it('handles styles logical properties', () => {
    const result = styles({
      borderInlineStartWidth: 'thin',
      borderStartEndRadius: 'small',
      marginInlineStart: 'auto',
      maxBlockSize: 'large',
      paddingInline: 0,
      marginBlockEnd: 2,
    })(theme)

    expect(result).toEqual({
      borderInlineStartWidth: 1,
      borderStartEndRadius: 5,
      maxBlockSize: 16,
      paddingInline: 0,
      marginBlockEnd: 8,
      marginInlineStart: 'auto',
    })
  })

  it('works with the styles prop', () => {
    const result = styles({
      color: 'primary',
      margin: 0,
      fontSize: 2,
    })(theme)

    expect(result).toEqual({
      color: 'blue',
      margin: 0,
      fontSize: 16,
    })
  })

  it('works with functional arguments', () => {
    const result = styles((t) => ({
      color: t.colors?.primary,
    }))(theme)

    expect(result).toEqual({
      color: 'blue',
    })
  })

  it('supports functional values', () => {
    const result = styles({
      color: (t) => get(t, 'colors.primary'),
    })(theme)

    expect(result).toEqual({
      color: 'blue',
    })
  })

  it('returns variants from theme', () => {
    const result = styles({
      themeKey: 'buttons.primary',
    })(theme)

    expect(result).toEqual({
      padding: 16,
      fontWeight: 600,
      color: 'white',
      backgroundColor: 'blue',
      borderRadius: 2,
    })
  })

  it('handles variants with responsive values', () => {
    const result = styles({
      themeKey: 'text.action',
    })(theme)

    expect(result).toEqual({
      fontSize: 14,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      '@media screen and (min-width: 640px)': {
        fontSize: 16,
      },
    })
  })

  it('handles responsive variants', () => {
    const result = styles({
      themeKey: 'text.title',
    })(theme)

    expect(result).toEqual({
      fontSize: 24,
      letterSpacing: '-0.01em',
      '@media screen and (min-width: 640px)': {
        fontSize: 36,
        letterSpacing: '-0.02em',
      },
    })
  })

  it('handles negative margins from scale', () => {
    const result = styles({
      marginTop: -3,
      marginX: -4,
    })(theme)

    expect(result).toEqual({
      marginTop: -16,
      marginLeft: -32,
      marginRight: -32,
    })
  })

  it('handles negative top, left, bottom, and right from scale', () => {
    const result = styles({
      top: -1,
      right: -4,
      bottom: -3,
      left: -2,
    })(theme)

    expect(result).toEqual({
      top: -4,
      right: -32,
      bottom: -16,
      left: -8,
    })
  })

  it('handles negative margins from scale that is an object', () => {
    const result = styles({
      marginTop: '-s',
      marginX: '-m',
    })({ ...theme, space: { s: '16px', m: '32px' } })

    expect(result).toEqual({
      marginTop: '-16px',
      marginLeft: '-32px',
      marginRight: '-32px',
    })
  })

  it('skip breakpoints', () => {
    const result = styles({
      width: ['100%', null, '50%'],
    })(theme)

    expect(result).toEqual({
      width: '100%',
      '@media screen and (min-width: 640px)': {},
      '@media screen and (min-width: 768px)': {
        width: '50%',
      },
    })
  })

  it('padding shorthand does not collide with nested p selector', () => {
    const result = styles({
      p: {
        fontSize: 32,
        color: 'blue',
        padding: 2,
      },
      padding: 32,
    })(theme)

    expect(result).toEqual({
      p: {
        fontSize: 32,
        color: 'blue',
        padding: 8,
      },
      padding: 32,
    })
  })

  it('handles responsive aliases', () => {
    const result = styles({
      '@mobile': {
        bg: 'primary',
      },
      '@tablet': {
        bg: 'secondary',
      },
      '@desktop': {
        bg: 'background',
      },
      '@wideScreen': {
        bg: 'black',
      },
    })(theme)

    expect(result).toEqual({
      '@media (max-width: 768px)': {
        backgroundColor: 'blue',
      },
      '@media (max-width: 1024px)': {
        backgroundColor: 'cyan',
      },
      '@media (max-width: 1280px)': {
        backgroundColor: 'white',
      },
      '@media (min-width: 1280px)': {
        backgroundColor: 'black',
      },
    })
  })
})
