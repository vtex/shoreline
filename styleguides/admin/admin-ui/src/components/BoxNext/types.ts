import { ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { ThemeColors, BorderWidths, BorderRadius } from '../../themes-next'

export type ComponentType<R> = React.ComponentType<R> & { useProps: any }

export interface BorderStyleProps {
  /**
   * Border Width
   */
  borderWidth?: ResponsiveValue<BorderWidths>
  /**
   * Border Top Width
   */
  borderTopWidth?: ResponsiveValue<BorderWidths>
  /**
   * Border Bottom Width
   */
  borderBottomWidth?: ResponsiveValue<BorderWidths>
  /**
   * Border Right Width
   */
  borderRightWidth?: ResponsiveValue<BorderWidths>
  /**
   * Border Left Width
   */
  borderLeftWidth?: ResponsiveValue<BorderWidths>
  /**
   * Border radius
   */
  borderRadius?: ResponsiveValue<BorderRadius>
  /**
   * Border style
   */
  borderStyle?: ResponsiveValue<CSS.Property.BorderStyle>
  /**
   * Border Top Style
   */
  borderTopStyle?: ResponsiveValue<CSS.Property.BorderTopStyle>
  /**
   * Border Bottom Style
   */
  borderBottomStyle?: ResponsiveValue<CSS.Property.BorderBottomStyle>
  /**
   * Border Right Style
   */
  borderRightStyle?: ResponsiveValue<CSS.Property.BorderRightStyle>
  /**
   * Border Left Style
   */
  borderLeftStyle?: ResponsiveValue<CSS.Property.BorderLeftStyle>
}

export interface ColorStyleProps {
  /**
   * Background color
   */
  bg?: ResponsiveValue<ThemeColors | 'transparent' | 'inherit' | 'initial'>
  /**
   * Text color
   */
  color?: ResponsiveValue<ThemeColors | 'initial' | 'inherit'>
  /**
   * Border color
   */
  borderColor?: ResponsiveValue<
    ThemeColors | 'transparent' | 'inherit' | 'initial'
  >
  /**
   * Caret color
   */
  caretColor?: ResponsiveValue<ThemeColors | 'auto'>
  /**
   * Border top color
   */
  borderTopColor?: ResponsiveValue<
    ThemeColors | 'transparent' | 'inherit' | 'initial'
  >
  /**
   * Border bottom color
   */
  borderBottomColor?: ResponsiveValue<
    ThemeColors | 'transparent' | 'inherit' | 'initial'
  >
  /**
   * Border left color
   */
  borderLeftColor?: ResponsiveValue<
    ThemeColors | 'transparent' | 'inherit' | 'initial'
  >
  /**
   * Border right color
   */
  borderRightColor?: ResponsiveValue<
    ThemeColors | 'transparent' | 'inherit' | 'initial'
  >
  /**
   * Outline color
   */
  outlineColor?: ResponsiveValue<ThemeColors | 'invert' | 'inherit' | 'initial'>
  /**
   * Fill
   */
  fill?: ResponsiveValue<ThemeColors | 'initial' | 'inherit'>
  /**
   * Stroke
   */
  stroke?: ResponsiveValue<ThemeColors | 'initial' | 'inherit' | 'none'>
}
