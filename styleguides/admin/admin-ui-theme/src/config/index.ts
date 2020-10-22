import base from './base'
import components from './components'
import patterns from './patterns'

export * from './patterns'
export * from './styleProps'

export const unstableTheme = {
  ...base,
  components,
  patterns,
}

export type Theme = typeof unstableTheme

// ///////////// ///////////// ///////////// ///////////// ///////////
// WAGNI
// ///////////// ///////////// ///////////// ///////////// ///////////

export type FontSizes = '0' | '1' | '2' | '3' | '4'
export type BorderWidths = '0' | '1' | '2' | '3'
export type BorderRadius = '0' | '1' | '2' | '3' | 'full'
export type FontWeights = keyof typeof unstableTheme.fontWeights
export type LineHeights = keyof typeof unstableTheme.lineHeights
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

export type Sizes = keyof typeof unstableTheme.sizes

export type ThemeColors =
  | 'text'
  | 'background'
  | 'muted.0'
  | 'muted.1'
  | 'muted.2'
  | 'muted.3'
  | 'muted.4'
  | 'emphasis'
  | 'focus'
  | 'primary.base'
  | 'primary.hover'
  | 'primary.active'
  | 'primary.contrast'
  | 'primary.washed.0'
  | 'primary.washed.1'
  | 'primary.washed.2'
  | 'danger.base'
  | 'danger.hover'
  | 'danger.active'
  | 'danger.contrast'
  | 'danger.washed.0'
  | 'danger.washed.1'
  | 'danger.washed.2'
  | 'success.base'
  | 'success.hover'
  | 'success.active'
  | 'success.contrast'
  | 'success.washed.0'
  | 'warning.base'
