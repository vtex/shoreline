import React from 'react'

import { Label } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/label',
}

export function Show() {
  return (
    <Stack>
      <Label>Label</Label>
      <Label optional>Label</Label>
      <Stack role="group" space="$space-1">
        <Label htmlFor="example">Label for input</Label>
        <input id="example" />
      </Stack>
    </Stack>
  )
}
