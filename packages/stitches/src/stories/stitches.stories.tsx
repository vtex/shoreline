import React from 'react'
import { csx } from '../csx'

export default {
  title: 'shoreline/stitches',
}

const container = csx({
  '@layer': {
    tokens: {
      '--sl-bg-primary': 'pink',
    },
  },
  bg: '$bg-primary',
  size: 500,
})

export function Style() {
  return <div className={container}>Should have a pink background</div>
}
