import React from 'react'
import type { Meta } from '@storybook/react'
import { csx } from '../csx'

export default {
  title: 'shoreline/stitches',
} as Meta

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
