import { createPlugin } from '@vtex/onda-system'

export const animation = createPlugin({
  name: 'onda-plugin-animation',
  namespaces: ['opacities', 'transitions'],
  onCreateRule: () => ({
    opacity: 'opacities',
    transition: 'transitions',
  }),
})
