import '../../../dist/styles.min.css'
import '../tag.css'
import React from 'react'

import { Tag } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/tag',
}

export function Default() {
  return (
    <Tag variant="gray" size="large">
      Short text
    </Tag>
  )
}

export function Sizes() {
  return (
    <Stack>
      <Tag variant="gray" size="normal">
        Normal badge
      </Tag>
      <Tag variant="gray" size="large">
        Large badge
      </Tag>
    </Stack>
  )
}
