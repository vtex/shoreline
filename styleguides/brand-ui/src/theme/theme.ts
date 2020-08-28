import { Theme } from './typings'

const defineTheme = <T extends Theme>(t: T) => t

export const theme = defineTheme({
  space: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
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
        borderWidth: 1,
        borderRadius: 3,
        cursor: 'pointer',
        position: 'relative',
        border: 'none',
        '&:focus': {
          outline: 'none',
        },
      },
      variant: {
        primary: {
          textTransform: 'uppercase',
          color: 'primary.contrast',
          backgroundColor: 'primary.base',
          fontWeight: 'medium',
          '&:hover': {
            backgroundColor: 'primary.hover',
          },
          '&:active': {
            backgroundColor: 'primary.active',
          },
          '&:disabled': {
            color: 'text',
            backgroundColor: 'muted.2',
          },
        },
        secondary: {
          textTransform: 'uppercase',
          color: 'secondary.contrast',
          backgroundColor: 'secondary.base',
          fontWeight: 'medium',
          '&:hover': {
            backgroundColor: 'secondary.hover',
          },
          '&:active': {
            backgroundColor: 'secondary.active',
          },
          '&:disabled': {
            color: 'text',
            backgroundColor: 'muted.2',
          },
        },
      },
      size: {
        regular: {
          paddingY: 5,
          fontSize: 1,
          height: 40,
          width: 'auto',
          paddingLeft: 9,
          paddingRight: 9,
        },
        small: {
          paddingY: 4,
          fontSize: 0,
          height: 32,
          width: 'auto',
          paddingLeft: 7,
          paddingRight: 7,
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
})
