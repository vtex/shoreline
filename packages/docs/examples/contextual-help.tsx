import React from 'react'
import { ContextualHelp } from '@vtex/shoreline'

export default function Example() {
  return (
    <ContextualHelp placement="bottom-start" label="Message">
      Visits to the store which can include a series of user interactions and
      end after 30 minutes of inactivity.
    </ContextualHelp>
  )
}
