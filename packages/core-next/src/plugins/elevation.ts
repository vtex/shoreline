import { createPlugin } from '../system'

export const elevation = createPlugin({
  name: 'onda-plugin-elevation',
  namespaces: ['shadows', 'zIndices'],
  rules: {
    boxShadow: 'shadows',
    textShadow: 'shadows',
    zIndex: 'zIndices',
  },
})
