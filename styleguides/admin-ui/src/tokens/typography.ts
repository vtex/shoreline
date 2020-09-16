import { ResponsiveValue, system } from 'styled-system'
import * as CSS from 'csstype'

import { FontSizes, FontVariation, LineHeights } from '../theme/theme'

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
})

export interface TypographyTokensProps {
  /**
   * Font size
   */
  fs?: FontSizes
  /**
   * Font Varition Settings
   */
  fv?: FontVariation
  /**
   * Line height
   */
  lh?: LineHeights
  /**
   * Text align
   */
  ta?: ResponsiveValue<CSS.Property.TextAlign>
}
