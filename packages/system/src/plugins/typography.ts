import { createPlugin } from '../plugin'

export const typography = createPlugin({
  name: 'onda-plugin-typography',
  onCreateAlias: () => ({
    fontSettings: 'fontVariationSettings',
  }),
  onCreateRule: () => ({
    fontFamily: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    letterSpacing: 'letterSpacings',
    fontVariationSettings: 'fontSettings',
    text: 'text',
  }),
})
