import { createPlugin } from '@vtex/onda-system'

export const animation = createPlugin({
  name: 'onda-plugin-animation',
  namespaces: ['opacities', 'transitions'],
  rules: {
    opacity: 'opacities',
    transition: 'transitions',
  },
})
