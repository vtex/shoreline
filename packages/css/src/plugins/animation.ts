import { createPlugin } from '../createPlugin'

export const animation = createPlugin({
  name: 'onda-plugin-animation',
  onCreateRule: () => ({
    opacity: 'opacities',
    transition: 'transitions',
  }),
})
