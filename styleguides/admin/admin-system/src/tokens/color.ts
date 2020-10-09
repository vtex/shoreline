import { system, ResponsiveValue } from 'styled-system'

import { ThemeColors } from '../theme/config'

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
  stroke?: ResponsiveValue<ThemeColors | 'initial' | 'inherit' | 'none'>
}
