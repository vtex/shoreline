import buttons from './components/buttons'

export const theme = {
  colors: {
    text: '#4A4A4A',
    background: '#F8F7FC',
    muted: ['#717786', '#A1A8B3', '#CCCED8', '#E7E9EE', '#F8F7FC', '#FFFFFF'],
    focus: '#FFC4DD',
    primary: {
      base: '#E31C58',
      hover: '#C81E51',
      active: '#D71D55',
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
  buttons,
  components: {
    collapsible: {
      styles: {
        borderBottom: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'muted.2',
        backgroundColor: 'white',
      },
      header: {
        styles: {
          backgroundColor: 'white',
          border: 'none',
          px: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          cursor: 'pointer',
          color: 'secondary.base',
          '&:disabled': {
            color: 'muted.2',
          },
          '&:focus': {
            outline: 'none',
          },
        },
        size: {
          regular: {
            fontSize: 2,
            height: 64,
          },
          small: {
            fontSize: 1,
            height: 48,
          },
        },
      },
      content: {
        styles: {
          pt: 2,
          pb: 5,
          color: 'muted.0',
        },
        behavior: {
          regular: {
            px: 4,
          },
          stacked: {
            ml: 5,
          },
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
  space: [0, 2, 4, 8, 16, 24, 32, 64, 96, 128, 160, 256],
  borderWidths: [0, 1, 2, 4, 6],
  borderRadius: [0, 1, 2, 4, 6],
}
