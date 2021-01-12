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
