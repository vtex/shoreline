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
    blockSize: 'sizes',
    inlineSize: 'sizes',
    maxBlockSize: 'sizes',
    maxInlineSize: 'sizes',
    minBlockSize: 'sizes',
    minInlineSize: 'sizes',
    size: 'sizes',
    minSize: 'sizes',
    maxSize: 'sizes',
    absoluteSize: 'sizes',
  }),
  onSplit: () => ({
    size: ['width', 'height'],
    minSize: ['minWidth', 'minHeight'],
    maxSize: ['maxWidth', 'maxHeight'],
    absoluteSize: ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'],
  }),
})
