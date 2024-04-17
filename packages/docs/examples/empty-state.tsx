import React from 'react'
import { Button, EmptyState, Heading, Slot } from '@vtex/shoreline'

export default function Example() {
  return (
    <EmptyState>
      <Heading>Title goes here</Heading>
      <Slot name="actions">
        <Button variant="primary">label</Button>
      </Slot>
    </EmptyState>
  )
}
