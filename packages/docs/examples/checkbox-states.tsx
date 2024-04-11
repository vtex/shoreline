import React from 'react'
import { Checkbox, Stack } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack>
      <Checkbox>Label</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox indeterminate disabled>
        Indeterminate and disabled
      </Checkbox>
    </Stack>
  )
}
