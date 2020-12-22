import base from './base'
import components from './components'

export const theme = {
  ...base,
  components,
}

export type Theme = typeof theme

// ///////////// ///////////// ///////////// ///////////// ///////////
// WAGNI
// ///////////// ///////////// ///////////// ///////////// ///////////

export type FontSizes = '0' | '1' | '2' | '3' | '4'
export type BorderWidths = '0' | '1' | '2' | '3'
export type BorderRadius = '0' | '1' | '2' | '3' | 'full'
export type LineHeights = keyof typeof theme.lineHeights
export type ZIndexes = 'under' | 'plain' | 'over' | '1' | '2' | '3' | '4' | '5'

export type Space =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | 'px'
  | '2px'

export type Sizes = keyof typeof theme.sizes

export type ThemeColors =
  | 'dark.primary'
  | 'dark.secondary'
  | 'light.primary'
  | 'light.secondary'
  | 'mid.0'
  | 'mid.1'
  | 'mid.2'
  | 'focus'
  | 'blue'
  | 'blue.default'
  | 'blue.hover'
  | 'blue.pressed'
  | 'blue.accent'
  | 'blue.secondary.default'
  | 'blue.secondary.hover'
  | 'blue.secondary.pressed'
  | 'blue.secondary.accent'
  | 'red.default'
  | 'red.hover'
  | 'red.pressed'
  | 'red.accent'
  | 'red.secondary.default'
  | 'red.secondary.hover'
  | 'red.secondary.pressed'
  | 'red.secondary.accent'
  | 'green.default'
  | 'green.hover'
  | 'green.pressed'
  | 'green.accent'
  | 'green.secondary.default'
  | 'green.secondary.hover'
  | 'green.secondary.pressed'
  | 'green.secondary.accent'
  | 'yellow.default'
  | 'yellow.hover'
  | 'yellow.pressed'
  | 'yellow.accent'
  | 'yellow.secondary.default'
  | 'yellow.secondary.hover'
  | 'yellow.secondary.pressed'
  | 'yellow.secondary.accent'
