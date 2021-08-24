import { createPlugin } from '../system'

export const animation = createPlugin({
  name: 'onda-plugin-animation',
  namespaces: ['opacities', 'transitions'],
  rules: {
    opacity: 'opacities',
    transition: 'transitions',
  },
})
