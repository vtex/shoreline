import { createPlugin } from '../system'

export const sizes = createPlugin({
  name: 'onda-plugin-sizes',
  namespaces: ['sizes'],
  rules: {
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
  },
  splits: {
    size: ['width', 'height'],
    minSize: ['minWidth', 'minHeight'],
    maxSize: ['maxWidth', 'maxHeight'],
    absoluteSize: ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'],
  },
})
