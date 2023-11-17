import React from 'react'

import { VisuallyHidden } from '../index'

export default {
  title: 'primitives/visually-hidden',
}

export function Default() {
  return (
    <a href="https://vtex.com">
      Learn more<VisuallyHidden> about brazilian beaches</VisuallyHidden>
    </a>
  )
}
