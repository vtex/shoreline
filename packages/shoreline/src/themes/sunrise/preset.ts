import type { ShorelineConfig } from '@vtex/shoreline-css'

export const presetSunrise: ShorelineConfig = {
  outdir: '__theme-sunrise__',
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
      gray: {
        0: '#FFFFFF',
        1: '#F5F5F5',
        2: '#EBEBEB',
        3: '#E0E0E0',
        4: '#D6D6D6',
        5: '#C2C2C2',
        6: '#ADADAD',
        7: '#999999',
        8: '#858585',
        9: '#707070',
        10: '#5C5C5C',
        11: '#3D3D3D',
        12: '#1F1F1F',
        13: '#000000',
      },
      red: {
        1: '#FDF6F5',
        2: '#FFEDEA',
        3: '#FFDFD9',
        4: '#FFD0C7',
        5: '#FFBBAD',
        6: '#FF9E8B',
        7: '#FF7F68',
        8: '#F95D47',
        9: '#EC3727',
        10: '#D31A15',
        11: '#B40202',
        12: '#940303',
        13: '#720000',
      },
      orange: {
        1: '#FDF5E9',
        2: '#FFEDCD',
        3: '#FFE0AE',
        4: '#FED392',
        5: '#FEBC64',
        6: '#FFA138',
        7: '#F78612',
        8: '#E57001',
        9: '#CC5E01',
        10: '#B24D01',
        11: '#963E01',
        12: '#7B3001',
        13: '#622401',
      },
      yellow: {
        1: '#FBF7D4',
        2: '#FDF5AD',
        3: '#FAEC6D',
        4: '#FADE1E',
        5: '#E9C701',
        6: '#D8B401',
        7: '#C5A001',
        8: '#B18D01',
        9: '#9C7901',
        10: '#866701',
        11: '#715401',
        12: '#5C4401',
        13: '#493401',
      },
      green: {
        1: '#E9FCE3',
        2: '#CEFDC0',
        3: '#AFF79E',
        4: '#97EF86',
        5: '#74E26C',
        6: '#4FD051',
        7: '#28BC37',
        8: '#08A822',
        9: '#019213',
        10: '#017D10',
        11: '#016810',
        12: '#01540E',
        13: '#01410B',
      },
      teal: {
        1: '#E9FAF8',
        2: '#CFF8F4',
        3: '#ABF2EB',
        4: '#8DEAE3',
        5: '#66DBD3',
        6: '#40CAC2',
        7: '#10B6AF',
        8: '#01A29B',
        9: '#018D88',
        10: '#017873',
        11: '#016460',
        12: '#0D504D',
        13: '#133D3B',
      },
      blue: {
        1: '#F1F8FD',
        2: '#E1F3FF',
        3: '#CBE9FF',
        4: '#B6DFFF',
        5: '#97CFFE',
        6: '#79BCFB',
        7: '#5AA8F7',
        8: '#3993F4',
        9: '#157BF4',
        10: '#0366DD',
        11: '#0155B7',
        12: '#014592',
        13: '#013672',
      },
      purple: {
        1: '#F9F5FD',
        2: '#F5EAFE',
        3: '#EDDCFE',
        4: '#E5CFFE',
        5: '#DABAFD',
        6: '#CBA3FC',
        7: '#BC8AFB',
        8: '#AD71F8',
        9: '#9C56F3',
        10: '#883CE6',
        11: '#7225D2',
        12: '#5C12B6',
        13: '#460B93',
      },
      pink: {
        1: '#FDF5F7',
        2: '#FFEBF2',
        3: '#FFDFEB',
        4: '#FFC8DC',
        5: '#FEB2CD',
        6: '#FF98BF',
        7: '#FE78AC',
        8: '#EF5997',
        9: '#DE387F',
        10: '#CA226A',
        11: '#AF0956',
        12: '#8F0246',
        13: '#74043B',
      },
      cyan: {
        1: '#E6FAFD',
        2: '#C6F9FF',
        3: '#A5F1FF',
        4: '#89E8FB',
        5: '#61D9F4',
        6: '#34C6E9',
        7: '#13B1DB',
        8: '#029DC9',
        9: '#0187B5',
        10: '#0172A0',
        11: '#015E8A',
        12: '#014B74',
        13: '#013A5E',
      },
    },
    fg: {
      base: {
        '*': '$color-gray-12',
        soft: '$color-gray-9',
        disabled: '$color-gray-7',
      },
      inverted: '$color-gray-0',
      warning: '$color-yellow-9',
      success: '$color-green-9',
      informational: '$color-blue-9',
      muted: {
        '*': '$color-gray-11',
        hover: '$color-gray-12',
        pressed: '$color-gray-13',
      },
      accent: {
        '*': '$color-blue-10',
        hover: '$color-blue-11',
        pressed: '$color-blue-12',
      },
      critical: {
        '*': '$color-red-10',
        hover: '$color-red-11',
        pressed: '$color-red-12',
      },
    },
    bg: {
      base: {
        '*': '$color-gray-0',
        disabled: 'color-mix(in srgb, $color-gray-12 5%, transparent)',
        strong: {
          '*': '$color-gray-3',
          disabled: '$color-gray-6',
        },
        soft: '$color-gray-1',
      },
      warning: '$color-yellow-1',
      success: '$color-green-1',
      informational: '$color-blue-1',
      inverted: {
        '*': '$color-gray-12',
        strong: 'color-mix(in srgb, $color-gray-12 50%, transparent)',
      },
      muted: {
        '*': 'color-mix(in srgb, $color-gray-12 5%, transparent)',
        hover: 'color-mix(in srgb, $color-gray-12 10%, transparent)',
        pressed: 'color-mix(in srgb, $color-gray-12 15%, transparent)',
        plain: {
          '*': 'color-mix(in srgb, $color-gray-12 0%, transparent)',
          hover: 'color-mix(in srgb, $color-gray-12 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-gray-12 10%, transparent)',
        },
      },
      accent: {
        '*': '$color-blue-2',
        hover: '$color-blue-3',
        pressed: '$color-blue-4',
        plain: {
          '*': 'color-mix(in srgb, $color-blue-10 0%, transparent)',
          hover: 'color-mix(in srgb, $color-blue-10 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-blue-10 10%, transparent)',
        },
        strong: {
          '*': '$color-blue-10',
          hover: '$color-blue-11',
          pressed: '$color-blue-12',
        },
      },
      critical: {
        '*': '$color-red-1',
        plain: {
          '*': 'color-mix(in srgb, $color-red-10 0%, transparent)',
          hover: 'color-mix(in srgb, $color-red-10 5%, transparent)',
          pressed: 'color-mix(in srgb, $color-red-10 10%, transparent)',
        },
        strong: {
          '*': '$color-red-10',
          hover: '$color-red-11',
          pressed: '$color-red-12',
        },
      },
    },
    border: {
      base: {
        '*': '1px solid $color-gray-3',
        disabled: '1px solid $color-gray-6',
        strong: {
          '*': '1px solid $color-gray-5',
          hover: '1px solid $color-gray-6',
        },
      },
      success: '1px solid $color-green-3',
      informational: '1px solid $color-blue-3',
      warning: '1px solid $color-yellow-3',
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
    radius: {
      0: '0rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      full: '9999rem',
    },
    'focus-ring': {
      base: '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-gray-5',
      critical:
        '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-red-6',
      accent:
        '0rem 0rem 0rem 0.0625rem $color-gray-0, 0rem 0rem 0rem 0.1875rem $color-blue-6',
    },
    shadow: {
      1: '0rem 0.25rem 1rem 0rem rgba(0, 0, 0, 0.16)',
      2: '0rem 1.5rem 3rem 0rem rgba(0, 0, 0, 0.16)',
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
        'letter-spacing': '$letter-spacing-1',
      },
      emphasis: {
        font: '$font-weight-medium $font-size-2 / $line-height-2 $font-family-sans',
        'letter-spacing': '$letter-spacing-1',
      },
      body: {
        font: '$font-weight-regular $font-size-2 / $line-height-2 $font-family-sans',
        'letter-spacing': '$letter-spacing-1',
      },
      display: {
        4: {
          font: '$font-weight-regular $font-size-3 / $line-height-3 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
        3: {
          font: '$font-weight-semibold $font-size-3 / $line-height-3 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
        2: {
          font: '$font-weight-semibold $font-size-4 / $line-height-4 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
        1: {
          font: '$font-weight-semibold $font-size-5 / $line-height-5 $font-family-sans',
          'letter-spacing': '$letter-spacing-1',
        },
      },
    },
  },
}
