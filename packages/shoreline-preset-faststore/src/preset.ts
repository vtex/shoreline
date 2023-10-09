import type { ShorelineConfig } from '@vtex/shoreline-utils'

export const preset: ShorelineConfig = {
  outdir: './shoreline',
  cwd: process.cwd(),
  tokens: {
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
      gap: '$space-4',
    },
    color: {
      main: {
        0: '#ecf0ff',
        1: '#d8e2ff',
        2: '#00419e',
        3: '#002c71',
        4: '#001947',
      },
      accent: {
        0: '#ebdcff',
        1: '#8d50fd',
        2: '#732fe2',
        3: '#5900c8',
        4: '#4700a0',
      },
      neutral: {
        0: '#ffffff',
        1: '#f1f2f3',
        2: '#e3e6e8',
        3: '#c7ccd1',
        4: '#9099a2',
        5: '#74808b',
        6: '#5d666f',
        7: '#171a1c',
      },
      primary: {
        text: '$color-text-inverse',
        bkg: {
          '*': '$color-main-2',
          hover: '$color-main-3',
          active: '$color-main-4',
          light: {
            '*': '$color-main-0',
            active: '$color-main-1',
          },
        },
      },
      secondary: {
        text: '$color-primary-bkg',
        bkg: {
          '*': 'transparent',
          hover: '$color-primary-bkg',
          active: '$color-main-3',
          light: {
            '*': '$color-main-0',
            active: '$color-secondary-bkg-light',
          },
        },
      },
      tertiary: {
        text: '$color-primary-bkg',
        bkg: {
          '*': 'transparent',
          hover: '$color-primary-bkg',
          active: '$color-main-3',
          light: {
            '*': '$color-main-0',
            active: '$color-secondary-bkg-light',
          },
        },
      },

      gray: {
        0: '#FFFFFF',
        1: '#F5F5F5',
        2: '#EDEDED',
        3: '#E6E6E6',
        4: '#DEDEDE',
        5: '#C7C7C7',
        6: '#B1B1B1',
        7: '#9B9B9B',
        8: '#868686',
        9: '#717171',
        10: '#666666',
        11: '#5B5B5B',
        12: '#484848',
        13: '#303030',
        14: '#1D1D1D',
      },
    },
    fg: {
      '*': '$color-gray-14',
      soft: '$color-gray-10',
      disabled: '$color-gray-7',
      inverted: '$color-gray-0',
      warning: '$color-yellow-9',
      success: '$color-green-9',
      informational: '$color-blue-9',
      muted: {
        '*': '$color-gray-12',
        hover: '$color-gray-13',
        pressed: '$color-gray-14',
      },
      accent: {
        '*': '$color-blue-10',
        hover: '$color-blue-11',
        pressed: '$color-blue-12',
      },
      critical: {
        '*': '$color-red-9',
        hover: '$color-red-10',
        pressed: '$color-red-11',
      },
    },
    bg: {
      '*': '$color-gray-0',
      disabled: 'color-mix(in srgb, $color-gray-14 5%, transparent)',
      warning: '$color-yellow-1',
      success: '$color-green-1',
      informational: '$color-blue-1',
      strong: {
        '*': '$color-gray-3',
        disabled: '$color-gray-6',
      },
      inverted: {
        '*': '$color-gray-14',
        plain: 'color-mix(in srgb, $color-gray-14 50%, transparent)',
      },
      muted: {
        '*': '$color-gray-1',
        hover: '$color-gray-2',
        pressed: '$color-gray-3',
        plain: {
          '*': 'color-mix(in srgb, $color-gray-14 0%, transparent)',
          hover: 'color-mix(in srgb, $color-gray-14 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-gray-14 10%, transparent)',
        },
      },
      accent: {
        '*': '$color-blue-2',
        hover: '$color-blue-3',
        pressed: '$color-blue-4',
        plain: {
          '*': 'color-mix(in srgb, $color-main-3 0%, transparent)',
          hover: 'color-mix(in srgb, $color-main-3 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-main-3 10%, transparent)',
        },
        strong: {
          '*': '$color-main-2',
          hover: '$color-main-3',
          pressed: '$color-main-4',
        },
      },
      critical: {
        '*': '$color-red-1',
        plain: {
          '*': 'color-mix(in srgb, $color-red-9 0%, transparent)',
          hover: 'color-mix(in srgb, $color-red-9 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-red-9 10%, transparent)',
        },
        strong: {
          '*': '$color-red-9',
          hover: '$color-red-10',
          pressed: '$color-red-11',
        },
      },
    },
    border: {
      '*': '1px solid $color-gray-3',
      disabled: '1px solid $color-gray-6',
      success: '1px solid $color-green-3',
      informational: '1px solid $color-blue-3',
      warning: '1px solid $color-yellow-3',
      strong: {
        '*': '1px solid $color-gray-5',
        hover: '1px solid $color-gray-6',
      },
      accent: {
        '*': '1px solid $color-blue-3',
        strong: {
          '*': '1px solid $color-blue-10',
          hover: '1px solid $color-blue-11',
        },
      },
      critical: {
        '*': '1px solid $color-red-3',
        strong: {
          '*': '1px solid $color-red-8',
          hover: '1px solid $color-red-9',
        },
      },
    },
    'border-radius': {
      none: '0rem',
      small: '0.25rem',
      medium: '0.5rem',
      large: '0.75rem',
      full: '100%',
    },
    'focus-ring': {
      '*': '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-gray-5',
      critical:
        '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-red-6',
      accent:
        '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-blue-6',
    },
    shadow: {
      1: '0rem 0.125rem 0.5rem 0rem rgba(0, 0, 0, 0.12)',
      2: '0rem 0.25rem 1rem 0rem rgba(0, 0, 0, 0.16)',
      3: '0rem 1.5rem 3rem 0rem rgba(0, 0, 0, 0.16)',
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
    'font-family': {
      sans: '"Inter", -apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    },
    'font-weight': {
      regular: '400',
      medium: '500',
      semibold: '600',
    },
    'font-size': {
      1: '0.75rem',
      2: '0.875rem',
      3: '1rem',
      4: '1.25rem',
      5: '1.5rem',
    },
    'letter-spacing': {
      1: '0rem',
      2: '-0.00875rem',
      3: '-0.02rem',
      4: '-0.04rem',
    },
    'line-height': {
      1: '1rem',
      2: '1.25rem',
      3: '1.5rem',
      4: '1.75rem',
      5: '2rem',
    },
    text: {
      caption: {
        2: {
          font: '$font-weight-regular $font-size-1 / $line-height-1 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
        1: {
          font: '$font-weight-medium $font-size-1 / $line-height-1 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
      },
      action: {
        font: '$font-weight-semibold $font-size-2 / $line-height-2 $font-family-sans',
        'letter-spacing': '$letter-spacing-2',
      },
      emphasis: {
        font: '$font-weight-medium $font-size-2 / $line-height-2 $font-family-sans',
        'letter-spacing': '$letter-spacing-2',
      },
      body: {
        font: '$font-weight-regular $font-size-2 / $line-height-2 $font-family-sans',
        'letter-spacing': '$letter-spacing-2',
      },
      display: {
        4: {
          font: '$font-weight-regular $font-size-3 / $line-height-3 $font-family-sans',
          'letter-spacing': '$letter-spacing-3',
        },
        3: {
          font: '$font-weight-semibold $font-size-3 / $line-height-3 $font-family-sans',
          'letter-spacing': '$letter-spacing-3',
        },
        2: {
          font: '$font-weight-semibold $font-size-4 / $line-height-4 $font-family-sans',
          'letter-spacing': '$letter-spacing-4',
        },
        1: {
          font: '$font-weight-semibold $font-size-5 / $line-height-5 $font-family-sans',
          'letter-spacing': '$letter-spacing-4',
        },
      },
    },
  },
}
