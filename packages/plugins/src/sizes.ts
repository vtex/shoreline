import { createPlugin } from '@vtex/onda-system'

export const sizes = createPlugin({
  name: 'onda-plugin-sizes',
  onCreateRule: () => ({
    width: 'sizes',
    minWidth: 'sizes',
    maxWidth: 'sizes',
    height: 'sizes',
    minHeight: 'sizes',
    maxHeight: 'sizes',
    flexBasis: 'sizes',
    size: 'sizes',
    blockSize: 'sizes',
    inlineSize: 'sizes',
    maxBlockSize: 'sizes',
    maxInlineSize: 'sizes',
    minBlockSize: 'sizes',
    minInlineSize: 'sizes',
  }),
  onSplit: () => ({
    size: ['width', 'height'],
  }),
})
