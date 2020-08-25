import { Theme } from './typings'

const defineTheme = <T extends Theme>(t: T) => t

export const theme = defineTheme({
  space: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  colors: {
    text: '#323845',
    background: '#FFFFFF',
    muted: ['#686E7B', '#8B9299', '#C1C6CC', '#D7DADF', '#F3F5F9'],
    focus: '#8DB6FA',
    primary: {
      base: '#919991',
      hover: '#EA1919',
      active: '#3F6FDB',
      contrast: '#FFFFFF',
      washed: '#F4F8FE',
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
