import React from 'react'
import { Button, EmptyState, Heading, EmptyStateActions } from '@vtex/shoreline'

export default function Example() {
  return (
    <EmptyState>
      <Heading>Title goes here</Heading>
      <EmptyStateActions>
        <Button variant="primary">label</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
