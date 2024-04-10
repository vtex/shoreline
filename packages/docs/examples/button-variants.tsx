import React from 'react'
import { Button, Stack } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack horizontal>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="critical">Critical</Button>
      <Button variant="criticalTertiary">Critical Tertiary</Button>
    </Stack>
  )
}
