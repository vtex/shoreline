import base from './base'
import components from './components'
import patterns from './patterns'

export * from './patterns'
export * from './styleProps'

export const theme = {
  ...base,
  components,
  patterns,
}

export type Theme = typeof theme

// ///////////// ///////////// ///////////// ///////////// ///////////
// WAGNI
// ///////////// ///////////// ///////////// ///////////// ///////////

export type FontSizes = '0' | '1' | '2' | '3' | '4'
export type BorderWidths = '0' | '1' | '2' | '3'
export type BorderRadius = '0' | '1' | '2' | '3' | 'full'
export type FontWeights = keyof typeof theme.fontWeights
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
  | 'text.primary'
  | 'background'
  | 'text.secondary'
  | 'muted.0'
  | 'muted.1'
  | 'muted.2'
  | 'muted.3'
  | 'brand'
  | 'focus'
  | 'primary.base'
  | 'primary.hover'
  | 'primary.pressed'
  | 'primary.accent'
  | 'secondary'
  | 'secondary.hover'
  | 'secondary.pressed'
  | 'danger.base'
  | 'danger.hover'
  | 'danger.pressed'
  | 'danger.accent'
  | 'danger.washed.base'
  | 'danger.washed.hover'
  | 'danger.washed.pressed'
  | 'success.base'
  | 'success.hover'
  | 'success.pressed'
  | 'success.accent'
  | 'success.washed.base'
  | 'warning.base'
