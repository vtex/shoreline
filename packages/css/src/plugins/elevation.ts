import { createPlugin } from '../createPlugin'

export const elevation = createPlugin({
  name: 'onda-plugin-elevation',
  onCreateRule: () => ({
    boxShadow: 'shadows',
    textShadow: 'shadows',
    zIndex: 'zIndices',
  }),
})
