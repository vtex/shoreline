import { createPlugin } from '../plugin'

export const flex = createPlugin({
  name: 'onda-plugin-flex',
  onCreateAlias: () => ({
    justify: 'justifyContent',
    direction: 'flexDirection',
    align: 'alignItems',
    grow: 'flexGrow',
    shrink: 'flexShrink',
    basis: 'flexBasis',
    wrap: 'flexWrap',
  }),
})
