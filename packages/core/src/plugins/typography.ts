import { createPlugin } from '@vtex/onda-system'

export const typography = createPlugin({
  name: 'onda-plugin-typography',
  namespaces: [
    'fonts',
    'fontSizes',
    'fontWeights',
    'lineHeights',
    'letterSpacings',
    'fontSettings',
    'text',
  ],
  aliases: {
    fontSettings: 'fontVariationSettings',
  },
  rules: {
    fontFamily: 'fonts',
    fontSize: 'fontSizes',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    letterSpacing: 'letterSpacings',
    fontVariationSettings: 'fontSettings',
    text: 'text',
  },
})
