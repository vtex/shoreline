import { createPlugin } from '@vtex/onda-system'

export const elevation = createPlugin({
  name: 'onda-plugin-elevation',
  namespaces: ['shadows', 'zIndices'],
  onCreateRule: () => ({
    boxShadow: 'shadows',
    textShadow: 'shadows',
    zIndex: 'zIndices',
  }),
})
