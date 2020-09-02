import { SxStyleProp } from 'theme-ui'

export interface FeedbackPalette {
  base: string
  hover: string
  active: string
  contrast: string
  washed: string
}

export type Theme<T = {}> = T & {
  space: number[]
  colors: { [key: string]: FeedbackPalette | string | string[] }
  components: { [key: string]: { [key: string]: SxStyleProp } }
  fonts?: {
    body: string
    heading: string
    monospace: string
  }
  fontSizes: number[]
  fontWeights?: { [key: string]: number }
  lineHeights?: { [key: string]: number }
  borderWidths: number[]
  borderRadius: number[]
}
