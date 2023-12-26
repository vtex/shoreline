import React from 'react'
import type { Meta } from '@storybook/react'

import { VisuallyHidden } from '../index'

export default {
  title: 'primitives/visually-hidden',
} as Meta

export function Default() {
  return (
    <a href="https://vtex.com">
      Learn more<VisuallyHidden> about brazilian beaches</VisuallyHidden>
    </a>
  )
}
