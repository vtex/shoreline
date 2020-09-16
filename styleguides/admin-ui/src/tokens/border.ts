import { system, ResponsiveValue } from 'styled-system'
import * as CSS from 'csstype'

import { BorderSizes } from '../theme/theme'

export const borderTokens = system({
  bw: {
    property: 'borderWidth',
    scale: 'borderWidths',
  },
  br: {
    property: 'borderRadius',
    scale: 'borderRadius',
  },
  bs: {
    property: 'borderStyle',
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
