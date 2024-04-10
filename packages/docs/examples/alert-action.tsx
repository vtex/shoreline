import React from 'react'
import { Alert, Button, Text } from '@vtex/shoreline'

export default function Example() {
  return (
    <Alert variant="warning">
      <Text variant="body">You have pending requests in your account</Text>
      <Button variant="tertiary" onClick={() => alert('Action dispatched')}>
        Acknowledge
      </Button>
    </Alert>
  )
}
