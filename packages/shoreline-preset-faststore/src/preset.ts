import type { ShorelineConfig } from '@vtex/shoreline-utils'

export const preset: ShorelineConfig = {
  outdir: './faststore',
  cwd: process.cwd(),
  tokens: {
    color: {
      // PALETTE
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

      // HIERARCHY
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
          hover: '$color-main-0',
          active: '$color-main-1',
          light: {
            '*': '$color-neutral-0',
            active: '$color-tertiary-bkg-light',
          },
        },
      },

      // COMPONENTS & STATES
      body: {
        bkg: '$color-neutral-0',
      },
      action: {
        text: '$color-text-inverse',
        bkg: {
          '*': '$color-accent-4',
          hover: '$color-accent-3',
          active: '$color-accent-2',
          light: {
            '*': '$color-accent-0',
            active: '$color-tertiary-bkg-light',
          },
        },
      },

      // link...

      text: {
        '*': '$color-neutral-7',
        light: '$color-neutral-6',
        inverse: '$color-neutral-0',
        display: '$color-neutral-7',
      },

      focus: {
        ring: {
          '*': '#8db6fa',
          outline: '#8db6fa80',
          danger: '#e1adad',
        },
      },
    },
    'border-radius': {
      '*': '2px',
      small: '1px',
      medium: '8px',
      pill: '100px',
      circle: '100%',
    },
    'border-width': {
      '*': '1px',
      thick: '2px',
      thickest: '3px',
    },

    control: {
      tap: {
        size: {
          '*': '$spacing-7',
          smallest: '$control-tap-size',
        },
        'min-height': '$control-tap-size',
      },
    },
    text: {
      face: {
        body: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
        title: '$text-face-body',
      },
      body: '$text-size-base $text-face-body',
    },
    'text-weight': {
      light: '300',
      regular: '400',
      bold: '700',
      black: '900',
    },

    'text-size': {
      base: '16px',
      0: '12px',
      1: '14px',
      2: '$text-size-base',
      3: 'calc($text-size-2 * $text-scale)',
      4: 'calc($text-size-3 * $text-scale)',
      5: 'calc($text-size-4 * $text-scale)',
      6: 'calc($text-size-5 * $text-scale)',
      7: 'calc($text-size-6 * $text-scale)',
      8: 'calc($text-size-7 * $text-scale)',
      title: {
        huge: '$text-size-7',
        page: '$text-size-6',
        product: '$text-size-4',
        section: '$text-size-4',
        subsection: '$text-size-4',
        mini: '$text-size-4',
      },
      lead: '$text-size-3',
      menu: '$text-size-base',
      body: '$text-size-base',
      legend: '$text-size-1',
      tiny: '$text-size-0',
    },
    // text: {
    //   face: {
    //     body: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
    //     title: '$text-face-body',
    //   },
    //   weight: {
    //     light: '300',
    //     regular: '400',
    //     bold: '700',
    //     black: '900',
    //   },
    //   'max-lines': 2,
    //   scale: {
    //     '*': 1.13,
    //     '@media-medium': 1.25,
    //   },
    //   size: {
    //     // NUMERIC
    //     base: '16px',
    //     0: '12px',
    //     1: '14px',
    //     2: '$text-size-base',
    //     3: 'calc($text-size-2 * $text-scale)',
    //     4: 'calc($text-size-3 * $text-scale)',
    //     5: 'calc($text-size-4 * $text-scale)',
    //     6: 'calc($text-size-5 * $text-scale)',
    //     7: 'calc($text-size-6 * $text-scale)',
    //     8: 'calc($text-size-7 * $text-scale)',

    //     // HIERARCHY
    //     title: {
    //       huge: '$text-size-7',
    //       page: '$text-size-6',
    //       product: '$text-size-4',
    //       section: '$text-size-4',
    //       subsection: '$text-size-4',
    //       mini: '$text-size-4',
    //     },
    //     lead: '$text-size-3',
    //     menu: '$text-size-base',
    //     body: '$text-size-base',
    //     legend: '$text-size-1',
    //     tiny: '$text-size-0',
    //   },
    // },
    spacing: {
      0: '0.25rem',
      1: '0.5rem',
      2: '0.75rem',
      3: '1rem',
      4: '1.5rem',
      5: '2rem',
      6: '2.5rem',
      7: '3rem',
      8: '3.5rem',
      9: '4rem',
      10: '4.5rem',
      11: '5rem',
      12: '5.5rem',
      13: '6rem',
    },
  },
}
