import { FontSizes, FontWeights, LineHeights } from '@vtex/admin-ui'
import { ResponsiveValue, system, variant } from 'styled-system'
import * as CSS from 'csstype'

const baseTokens = system({
  fs: {
    property: 'fontSize',
    scale: 'fontSizes',
  },
  lh: {
    property: 'lineHeight',
    scale: 'lineHeights',
  },
  ta: {
    property: 'textAlign',
  },
})

const fontWeightVariant = variant({
  prop: 'fw',
  scale: 'fontWeights',
})

export const typographyTokens = [fontWeightVariant, baseTokens]

export interface TypographyTokensProps {
  /**
   * Font size
   */
  fs?: ResponsiveValue<FontSizes>
  /**
   * Font Varition Settings
   */
  fw?: ResponsiveValue<FontWeights>
  /**
   * Line height
   */
  lh?: ResponsiveValue<LineHeights>
  /**
   * Text align
   */
  ta?: ResponsiveValue<CSS.Property.TextAlign>
}
