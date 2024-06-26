import type { Meta } from '@storybook/react'

import { VisuallyHidden } from '../index'

export default {
  title: 'components/visually-hidden',
} as Meta

export function Show() {
  return (
    <a href="https://vtex.com">
      Learn more<VisuallyHidden> about brazilian beaches</VisuallyHidden>
    </a>
  )
}
