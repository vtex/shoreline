import { createPlugin } from '@vtex/onda-system'

export const flex = createPlugin({
  name: 'onda-plugin-flex',
  namespaces: [],
  aliases: {
    justify: 'justifyContent',
    direction: 'flexDirection',
    align: 'alignItems',
    grow: 'flexGrow',
    shrink: 'flexShrink',
    basis: 'flexBasis',
    wrap: 'flexWrap',
  },
})
