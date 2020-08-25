import { Theme as ThemeUITheme } from 'theme-ui'

export interface Colors {
  text: string
  background: string
  focus: string
  muted: string[]
  primary: FeedbackPalette
  danger: FeedbackPalette
}

export type FeedbackPalettes = 'primary' | 'danger'

export interface FeedbackPalette {
  base: string
  hover: string
  active: string
  contrast: string
  washed: string
}

export interface Theme extends Omit<ThemeUITheme, 'colors'> {
  colors: Colors
}

const defineTheme = <T extends Theme>(t: T) => t

export const theme = defineTheme({
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
    danger: {
      base: '#D23030',
      hover: '#A70C0C',
      active: '#DE0404',
      contrast: '#FFFFFF',
      washed: '#FFF0F0',
    },
  },
  components: {
    skeleton: {},
  },
  fonts: {
    body: '"VTEX Trust", sans-serif',
    heading: '"VTEX Trust", sans-serif',
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
})
