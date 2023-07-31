import { csx } from '../csx'

export const container = csx({
  '@layer': {
    tokens: {
      '--sl-bg-primary': 'gray',
    },
  },
  bg: '$bg-primary',
  size: 500,
})
