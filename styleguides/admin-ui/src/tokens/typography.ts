import { ResponsiveValue, system } from 'styled-system'
import * as CSS from 'csstype'

import { FontSizes, FontVariation, LineHeights } from '../theme/config'

export const typographyTokens = system({
  fs: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  fv: {
    property: 'fontVariationSettings',
    scale: 'fontVariation',
  },
  lh: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
  ta: {
    property: 'textAlign',
  },
  fw: {
    property: 'fontWeight',
  },
})

export interface TypographyTokensProps {
  /**
   * Font size
   */
  fs?: ResponsiveValue<FontSizes>
  /**
   * Font Varition Settings
   */
  fv?: ResponsiveValue<FontVariation>
  /**
   * Line height
   */
  lh?: ResponsiveValue<LineHeights>
  /**
   * Text align
   */
  ta?: ResponsiveValue<CSS.Property.TextAlign>
  /**
   * Font Weight
   */
  fw?: ResponsiveValue<CSS.Property.FontWeight>
}
