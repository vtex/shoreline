import { createPlugin } from '../system'

export const elevation = createPlugin({
  name: 'onda-plugin-elevation',
  namespaces: ['shadow', 'zIndices'],
  rules: {
    boxShadow: 'shadow',
    textShadow: 'shadow',
    zIndex: 'zIndices',
  },
})
