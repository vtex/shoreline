import { createPlugin } from '@vtex/onda-system'

export const animation = createPlugin({
  name: 'onda-plugin-animation',
  onCreateRule: () => ({
    opacity: 'opacities',
    transition: 'transitions',
  }),
})
