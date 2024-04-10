import React from 'react'
import { Alert, Stack, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Alert variant="informational">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="success">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="critical">
        <Text variant="body">Short message</Text>
      </Alert>
      <Alert variant="warning">
        <Text variant="body">Short message</Text>
      </Alert>
    </Stack>
  )
}
