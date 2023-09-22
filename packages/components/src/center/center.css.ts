import { csx } from '@vtex/shoreline-vanilla-extract'

export const centerStyle = csx({
  '@layer': {
    components: {
      display: 'grid',
      placeItems: 'center',
    },
  },
})
