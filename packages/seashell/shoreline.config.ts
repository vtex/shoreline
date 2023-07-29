import { declareConfig } from './src/css-engine/declare-config'

export default declareConfig({
  prefix: 'sl',
  outdir: './shoreline',
  tokens: {
    bp: {
      mobile: '40em',
      tablet: '48em',
      desktop: '64em',
      widescreen: '75em',
    },
    space: {
      0: '0rem',
      '05': '0.125rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
    },
    color: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        50: '#F1F4FC',
        100: '#DDE5F7',
        200: '#BBCBF0',
        300: '#96B2F2',
        400: '#2953B2',
        500: '#20408C',
        600: '#172F66',
      },
      'light-blue': {
        50: '#EDF5FB',
        100: '#DEECF7',
        200: '#B9DAF3',
        300: '#7CBBEA',
        400: '#2978B5',
        500: '#216090',
        600: '#143C5C',
      },
      red: {
        50: '#FBF2F2',
        100: '#F8E3E3',
        200: '#EDBABA',
        300: '#F49494',
        400: '#CC3D3D',
        500: '#962828',
        600: '#782020',
      },
      green: {
        50: '#ECF7EC',
        100: '#DFF1E0',
        200: '#AEDDB0',
        300: '#83D187',
        400: '#38853C',
        500: '#285F2B',
        600: '#1C431E',
      },
      orange: {
        50: '#FFF5EC',
        100: '#FFEBD7',
        200: '#FFCD9B',
        300: '#F5AE70',
        400: '#D56A00',
        500: '#A65200',
        600: '#5C2C00',
      },
      cyan: {
        50: '#EFF9FB',
        100: '#D5EFF4',
        200: '#A4DEE9',
        300: '#63CBDB',
        400: '#1C99A8',
        500: '#207883',
        600: '#093F46',
      },
      purple: {
        50: '#F6F3FA',
        100: '#EDE8F4',
        200: '#D3C4E4',
        300: '#C6A5EA',
        400: '#835AB3',
        500: '#684391',
        600: '#462D63',
      },
      pink: {
        50: '#FBF2F5',
        100: '#F5E0E7',
        200: '#EAB2C4',
        300: '#F48AAB',
        400: '#DA3561',
        500: '#B1204B',
        600: '#850D35',
      },
      teal: {
        50: '#E8F7F3',
        100: '#CDEFE7',
        200: '#A6E0D2',
        300: '#66CBB7',
        400: '#007969',
        500: '#006053',
        600: '#00463C',
      },
      gray: {
        50: '#F4F4F4',
        100: '#E6E6E6',
        200: '#DDDDDD',
        300: '#B9B9B9',
        400: '#747474',
        500: '#545454',
        600: '#3B3B3B',
        transparent: {
          50: 'rgba(0, 0, 0, 0.05)',
          100: 'rgba(0, 0, 0, 0.1)',
          200: 'rgba(0, 0, 0, 0.2)',
          300: 'rgba(0, 0, 0, 0.3)',
          400: 'rgba(0, 0, 0, 0.4)',
          500: 'rgba(0, 0, 0, 0.5)',
          600: 'rgba(0, 0, 0, 0.6)',
          700: 'rgba(0, 0, 0, 0.7)',
          800: 'rgba(0, 0, 0, 0.8)',
          900: 'rgba(0, 0, 0, 0.9)',
        },
      },
    },
    bg: {
      primary: '$color-white',
      secondary: '$color-gray-50',
      disabled: '$color-gray-100',
      positive: '$color-green-100',
      critical: '$color-red-100',
      warning: '$color-orange-100',
      info: '$color-light-blue-100',
      inverted: '$color-black',
      overlay: '$color-gray-transparent-500',
      skeleton:
        'linear-gradient(90deg, transparent, $color-gray-100, transparent)',
      action: {
        neutral: {
          secondary: {
            '*': '$color-gray-50',
            hover: '$color-gray-100',
            pressed: '$color-gray-200',
          },
          tertiary: {
            '*': 'transparent',
            hover: '$color-gray-transparent-50',
            pressed: '$color-gray-transparent-100',
          },
        },
        main: {
          primary: {
            '*': '$color-blue-400',
            hover: '$color-blue-500',
            pressed: '$color-blue-600',
          },
          secondary: {
            '*': '$color-blue-100',
            hover: '$color-blue-200',
            pressed: '$color-blue-300',
          },
          tertiary: {
            '*': 'transparent',
            hover: '$color-blue-50',
            pressed: '$color-blue-100',
            selected: '$color-blue-50',
          },
        },
        critical: {
          primary: {
            '*': '$color-red-400',
            hover: '$color-red-500',
            pressed: '$color-red-600',
          },
          secondary: {
            '*': '$color-red-100',
            hover: '$color-red-200',
            pressed: '$color-red-300',
          },
          tertiary: {
            '*': 'transparent',
            hover: '$color-red-50',
            pressed: '$color-red-100',
            selected: '$color-red-50',
          },
        },
      },
      form: {
        neutral: {
          '*': 'transparent',
          hover: '$color-gray-100',
          pressed: '$color-gray-300',
          checked: {
            '*': '$color-black',
            hover: '$color-gray-600',
            pressed: '$color-gray-500',
          },
          inactive: {
            '*': '$color-gray-300',
            hover: '$color-gray-500',
            pressed: '$color-gray-600',
          },
          active: {
            '*': '$color-black',
            hover: '$color-gray-600',
            pressed: '$color-gray-500',
          },
        },
        control: {
          hover: 'transparent',
          checked: {
            '*': '$color-blue-400',
            hover: '$color-blue-500',
            focus: '$color-blue-500',
          },
          active: {
            '*': '$color-green-400',
            hover: '$color-green-500',
          },
          inactive: {
            '*': '$color-gray-300',
            hover: '$color-gray-400',
          },
        },
      },
    },
    fg: {
      primary: '$color-black',
      secondary: '$color-gray-500',
      disabled: '$color-gray-400',
      inverted: '$color-white',
      positive: '$color-green-400',
      info: '$color-light-blue-400',
      critical: '$color-red-400',
      warning: '$color-orange40',
      action: {
        neutral: {
          tertiary: {
            '*': '$color-gray-500',
            hover: '$color-gray-600',
            pressed: '$color-black',
          },
        },
        main: {
          primary: {
            '*': '$color-white',
            hover: '$color-white',
            pressed: '$color-white',
          },

          secondary: {
            '*': '$color-blue-400',
            hover: '$color-blue-500',
            pressed: '$color-blue-600',
          },

          tertiary: {
            '*': '$color-blue-400',
            hover: '$color-blue-500',
            pressed: '$color-blue-600',
            selected: '$color-blue-400',
          },
        },
        critical: {
          primary: {
            '*': '$color-white',
            hover: '$color-white',
            packageressed: '$color-white',
          },

          secondary: {
            '*': '$color-red-400',
            hover: '$color-red-500',
            pressed: '$color-red-600',
          },

          tertiary: {
            '*': '$color-red-400',
            hover: '$color-red-500',
            pressed: '$color-red-600',
            selected: '$color-red-400',
          },
        },
      },
      form: {
        neutral: {
          '*': '$color-black',
          checked: '$color-white',
        },
        control: {
          '*': '$color-white',
          neutral: '$color-black',
          checked: '$color-white',
        },
      },
    },
    'border-width': {
      0: '0rem',
      1: '0.0625rem',
      2: '0.125rem',
    },
    border: {
      neutral: '$border-width-1 solid $color-gray-200',
      main: {
        selected: '$border-width-2 solid $color-blue-400',
      },
      positive: '$border-width-1 solid $color-green30',
      info: '$border-width-1 solid $color-lightBlue30',
      critical: '$border-width-1 solid $color-red-300',
      warning: '$border-width-1 solid $color-orange30',
      disabled: '$border-width-1 solid $color-gray-400',

      form: {
        neutral: {
          '*': '$border-width-1 solid $color-gray-300',
          hover: '$border-width-1 solid $color-gray-500',
          focus: '$border-width-1 solid $color-gray-600',
          pressed: '$border-width-1 solid $color-gray-600',
          checked: {
            '*': '$border-width-1 solid $color-black',
            hover: '$border-width-1 solid $color-gray-600',
            pressed: '$border-width-1 solid $color-gray-500',
          },
        },

        critical: {
          '*': '$border-width-1 solid $color-red-400',
          hover: '$border-width-1 solid $color-red-500',
          focus: '$border-width-1 solid $color-red-600',
        },

        control: {
          '*': '$border-width-1 solid $color-gray-300',
          hover: '$border-width-1 solid $color-gray-500',
          focus: '$border-width-1 solid $color-gray-500',
          checked: {
            '*': '$border-width-1 solid $color-blue-400',
            hover: '$border-width-1 solid $color-blue-500',
            focus: '$border-width-1 solid $color-blue-500',
          },
        },
      },
    },
    radii: {
      none: '0rem',
      base: '0.25rem',
      pill: '100%',
    },
    shadow: {
      ring: {
        critical:
          '0rem 0rem 0rem 0.0625rem $color-red-50, 0rem 0rem 0rem 0.1875rem $color-red-300',
        neutral:
          '0rem 0rem 0rem 0.0625rem $color-gray-50, 0rem 0rem 0rem 0.1875rem $color-gray-300',
        main: '0rem 0rem 0rem 0.0625rem $color-blue-50, 0rem 0rem 0rem 0.1875rem $color-blue-300',
      },
      overlay: {
        center: '0rem 0rem 1rem 0rem $color-gray-transparent-10',
        bottom: '0rem 0rem 1.5rem 0rem $color-gray-transparent-05',
      },
    },
    z: {
      1: '0',
      2: '100',
      3: '200',
      4: '300',
      5: '400',
      6: '500',
      7: '600',
      8: '700',
      9: '800',
      10: '900',
    },
    font: {
      family: {
        sans: '"Inter", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
        mono: 'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace',
      },
      size: {
        1: '0.75rem',
        2: '0.875rem',
        3: '1rem',
        4: '1.25rem',
        5: '1.5rem',
      },
      weight: {
        hairline: '100',
        thin: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '800',
        ui: {
          baseline: '$font-weight-medium',
          strong: '$font-weight-semibold',
          strongest: '$font-weight-bold',
        },
      },
      'line-height': {
        1: '1.3',
        2: '1.5',
      },
    },
    text: {
      'page-title':
        '$font-weight-ui-baseline $font-size-4 / $font-line-height-1 $font-family-sans',
      title: {
        1: '$font-weight-ui-strong $font-size-3 / $font-line-height-2 $font-family-sans',
        2: '$font-weight-ui-baseline $font-size-3 / $font-line-height-2 $font-family-sans',
      },
      action: {
        1: '$font-weight-ui-strong $font-size-2 / $font-line-height-1 $font-family-sans',
        2: '$font-weight-ui-baseline $font-size-2 / $font-line-height-1 $font-family-sans',
      },
      display:
        '$font-weight-ui-strong $font-size-5 / $font-line-height-1 $font-family-sans',
      body: '$font-weight-ui-baseline $font-size-2 / $font-line-height-1 $font-family-sans',
      detail:
        '$font-weight-ui-baseline $font-size-1 / $font-line-height-1 $font-family-sans',
      code: '$font-weight-ui-baseline $font-size-2 / $font-line-height-1 $font-family-mono',
    },
  },
})
