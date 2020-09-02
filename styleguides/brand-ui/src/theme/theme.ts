import { Theme } from '@vtex-components/theme'

export const theme: Theme = {
  space: [0, 2, 4, 8, 16, 24, 32, 64, 96, 128, 160, 256],
  colors: {
    text: '#4A4A4A',
    background: '#C4C4C4',
    muted: ['#717786', '#A1A8B3', '#CCCED8', '#E7E9EE', '#F8F7FC'],
    focus: '#F71963', // Missing spec
    primary: {
      base: '#F71963',
      hover: '#D91657',
      active: '#E5175C',
      washed: '#FFF3F6',
      contrast: '#FFFFFF',
    },
    secondary: {
      base: '#142032',
      hover: '#000711',
      active: '#0C1522',
      washed: '#F5F9FF',
      contrast: '#FFFFFF',
    },
    success: {
      base: '#79A479',
      hover: '#719471',
      active: '#6D9C6D',
      washed: '#E6F2E6',
      contrast: '#FFFFFF',
    },
    warning: {
      base: '#FFB100',
      hover: '#E6A30A',
      active: '#EFA906',
      washed: '#FFF2D4',
      contrast: '#FFFFFF',
    },
    danger: {
      base: '#DC5A41',
      hover: '#CE4A30',
      active: '#D65138',
      washed: '#FDEFEF',
      contrast: '#FFFFFF',
    },
    bubblegum: {
      base: '#FFC4DD',
      hover: '#FCABCD',
      active: '#FEB9D6',
      washed: '#FFE0EF',
      contrast: '#FFFFFF',
    },
  },
  components: {
    button: {
      styles: {
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
          color: 'text',
          backgroundColor: 'muted.2',
        },
      },
      variant: {
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
          backgroundColor: 'secondary.contrast',
          '&:hover': {
            textDecoration: 'underline',
          },
          '&:active': {
            textDecoration: 'underline',
          },
        },
      },
      size: {
        regular: {
          paddingY: 8,
          height: 48,
          paddingX: 13,
        },
        small: {
          paddingY: 4,
          height: 32,
          paddingX: 9,
        },
        icon: {
          height: 48,
          paddingX: 9,
          paddingY: 4,
        },
      },
    },
  },
  fonts: {
    body: 'sans-serif',
    heading: 'sans-serif',
    monospace: 'monospace',
  },
  fontSizes: [12, 14, 16, 20],
  fontWeights: {
    regular: 400,
    medium: 500,
  },
  lineHeights: {
    small: 1.125,
    body: 1.25,
    highlight: 1.25,
    action: 1.5,
    subtitle: 1.5,
    headline: 1.5,
  },
  borderWidths: [0, 1, 2, 4, 6],
  borderRadius: [0, 1, 2, 4, 6],
}
