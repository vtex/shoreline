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

type ThemeColors =
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

export interface ColorTokensProps {
  /**
   * Background color
   */
  bg?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Text color
   */
  c?: ResponsiveValue<ThemeColors | 'initial' | 'inherit'>
  /**
   * Border color
   */
  bc?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Caret color
   */
  cc?: ResponsiveValue<ThemeColors | 'auto'>
  /**
   * Border top color
   */
  btc?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Border bottom color
   */
  bbc?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Border left color
   */
  blc?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Border right color
   */
  brc?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Outline color
   */
  oc?: ResponsiveValue<ThemeColors | 'invert' | 'inherit' | 'initial'>
  /**
   * Fill
   */
  fill?: ResponsiveValue<ThemeColors | 'initial' | 'inherit'>
  /**
   * Stroke
   */
  stroke?: ResponsiveValue<ThemeColors | 'initial' | 'inherit'>
}
