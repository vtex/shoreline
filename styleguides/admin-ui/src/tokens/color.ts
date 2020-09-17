import { system, ResponsiveValue } from 'styled-system'

export const colorTokens = system({
  bg: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  c: {
    property: 'color',
    scale: 'colors',
  },
  bc: {
    property: 'borderColor',
    scale: 'colors',
  },
  cc: {
    property: 'caretColor',
    scale: 'colors',
  },
  btc: {
    property: 'borderTopColor',
    scale: 'colors',
  },
  bbc: {
    property: 'borderBottomColor',
    scale: 'colors',
  },
  blc: {
    property: 'borderLeftColor',
    scale: 'colors',
  },
  brc: {
    property: 'borderRightColor',
    scale: 'colors',
  },
  oc: {
    property: 'outlineColor',
    scale: 'colors',
  },
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
})

type Colors =
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
  | 'primary.washed'
  | 'danger.base'
  | 'danger.hover'
  | 'danger.active'
  | 'danger.contrast'
  | 'danger.washed'

export interface ColorTokensProps {
  /**
   * Background color
   */
  bg?: ResponsiveValue<Colors>
  /**
   * Text color
   */
  c?: ResponsiveValue<Colors>
  /**
   * Border color
   */
  bc?: ResponsiveValue<Colors>
  /**
   * Caret color
   */
  cc?: ResponsiveValue<Colors>
  /**
   * Border top color
   */
  btc?: ResponsiveValue<Colors>
  /**
   * Border bottom color
   */
  bbc?: ResponsiveValue<Colors>
  /**
   * Border left color
   */
  blc?: ResponsiveValue<Colors>
  /**
   * Border right color
   */
  brc?: ResponsiveValue<Colors>
  /**
   * Outline color
   */
  oc?: ResponsiveValue<Colors>
  /**
   * Fill
   */
  fill?: ResponsiveValue<Colors>
  /**
   * Stroke
   */
  stroke?: ResponsiveValue<Colors>
}
