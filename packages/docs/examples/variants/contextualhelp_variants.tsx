import { ContextualHelp } from '@vtex/shoreline'

export function DefaultContextualHelp() {
  return (
    <ContextualHelp label="Help">
      This is a contextual help message providing additional information.
    </ContextualHelp>
  )
}

export function ContextualHelpTopStart() {
  return (
    <ContextualHelp placement="top-start" label="Message">
      Visits to the store which can include a series of user interactions and
      end after 30 minutes of inactivity.
    </ContextualHelp>
  )
}

export function ContextualHelpBottomStart() {
  return (
    <ContextualHelp placement="bottom-start" label="Message">
      Visits to the store which can include a series of user interactions and
      end after 30 minutes of inactivity.
    </ContextualHelp>
  )
}

export function ContextualHelpTopEnd() {
  return (
    <ContextualHelp placement="top-end" label="Message">
      Visits to the store which can include a series of user interactions and
      end after 30 minutes of inactivity.
    </ContextualHelp>
  )
}

export function ContextualHelpBottomEnd() {
  return (
    <ContextualHelp placement="bottom-end" label="Message">
      Visits to the store which can include a series of user interactions and
      end after 30 minutes of inactivity.
    </ContextualHelp>
  )
}
