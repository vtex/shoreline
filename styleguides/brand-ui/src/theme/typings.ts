import { Theme as ThemeUITheme } from 'theme-ui'

export interface Colors {
  text: string
  background: string
  focus: string
  muted: string[]
  primary: FeedbackPalette
  danger: FeedbackPalette
}

export type FeedbackPalettes =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'bubblegum'

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

export interface ThemeContext {
  theme: Theme
  colorMode: string
  setColorMode: React.Dispatch<React.SetStateAction<string>>
}
