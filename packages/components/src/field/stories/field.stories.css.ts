import { csx } from '@vtex/shoreline-vanilla-extract'

export const inputStyle = csx({
  border: '$border',
  '> input,textarea': {
    size: '100%',
  },
})
