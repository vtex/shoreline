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
  bw?: BorderSizes
  /**
   * Border radius
   */
  br?: BorderSizes
  /**
   * Border style
   */
  bs?: ResponsiveValue<CSS.Property.BorderStyle>
}
