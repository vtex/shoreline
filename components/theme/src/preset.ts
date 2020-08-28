import { SxStyleProp } from 'theme-ui'

export interface FeedbackPalette {
  base: string
  hover: string
  active: string
  contrast: string
  washed: string
}

type Theme<T = {}> = T & {
  space: number[]
  colors: { [key: string]: FeedbackPalette | string | string[] }
  components: { [key: string]: { [key: string]: SxStyleProp } }
  fonts: {
    body: string
    heading: string
    monospace: string
  }
  fontSizes: number[]
  fontWeights: { [key: string]: number }
  lineHeights: { [key: string]: number }
  borderWidths: number[]
  borderRadius: number[]
}

export const theme: Theme = {
  space: [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  colors: {
    text: '#323845',
    background: '#FFFFFF',
    muted: ['#686E7B', '#8B9299', '#C1C6CC', '#D7DADF', '#F3F5F9'],
    focus: '#8DB6FA',
    primary: {
      base: '#2953B2',
      hover: '#1E4397',
      active: '#3F6FDB',
      contrast: '#FFFFFF',
      washed: '#F4F8FE',
    },
  },
  components: {
    button: {
      style: {
        backgroundColor: 'primary',
      },
    },
  },
  fonts: {
    body: 'system-ui, -apple-system, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
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
