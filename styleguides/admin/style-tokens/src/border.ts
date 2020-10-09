import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'
import { BorderWidths, BorderRadius } from '@vtex/admin-ui'

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
  bw?: ResponsiveValue<BorderWidths>
  /**
   * Border Top Width
   */
  btw?: ResponsiveValue<BorderWidths>
  /**
   * Border Bottom Width
   */
  bbw?: ResponsiveValue<BorderWidths>
  /**
   * Border Right Width
   */
  brw?: ResponsiveValue<BorderWidths>
  /**
   * Border Left Width
   */
  blw?: ResponsiveValue<BorderWidths>
  /**
   * Border radius
   */
  br?: ResponsiveValue<BorderRadius>
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
