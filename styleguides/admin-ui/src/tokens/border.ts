import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { BorderSizes } from '../theme/theme'

export const borderTokens = system({
  bw: {
    property: 'borderWidth',
    scale: 'borderWidths',
  },
  btw: {
    property: 'borderTopWidth',
    scale: 'borderWidths',
  },
  bbw: {
    property: 'borderBottomWidth',
    scale: 'borderWidths',
  },
  blw: {
    property: 'borderLeftWidth',
    scale: 'borderWidths',
  },
  brw: {
    property: 'borderRightWidth',
    scale: 'borderWidths',
  },
  br: {
    property: 'borderRadius',
    scale: 'borderRadius',
  },
  bs: {
    property: 'borderStyle',
  },
  bts: {
    property: 'borderTopStyle',
  },
  bbs: {
    property: 'borderBottomStyle',
  },
  bls: {
    property: 'borderLeftStyle',
  },
  brs: {
    property: 'borderRightStyle',
  },
})

export interface BorderTokensProps {
  /**
   * Border Width
   */
  bw?: ResponsiveValue<BorderSizes>
  /**
   * Border Top Width
   */
  btw?: ResponsiveValue<BorderSizes>
  /**
   * Border Bottom Width
   */
  bbw?: ResponsiveValue<BorderSizes>
  /**
   * Border Right Width
   */
  brw?: ResponsiveValue<BorderSizes>
  /**
   * Border Left Width
   */
  blw?: ResponsiveValue<BorderSizes>
  /**
   * Border radius
   */
  br?: ResponsiveValue<BorderSizes>
  /**
   * Border style
   */
  bs?: ResponsiveValue<CSS.Property.BorderStyle>
  /**
   * Border Top Style
   */
  bts?: ResponsiveValue<CSS.Property.BorderTopStyle>
  /**
   * Border Bottom Style
   */
  bbs?: ResponsiveValue<CSS.Property.BorderBottomStyle>
  /**
   * Border Right Style
   */
  brs?: ResponsiveValue<CSS.Property.BorderRightStyle>
  /**
   * Border Left Style
   */
  bls?: ResponsiveValue<CSS.Property.BorderLeftStyle>
}
