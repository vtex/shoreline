import { TimeInput } from '@vtex/shoreline'

export function DefaultTimeInput() {
  return <TimeInput />
}

export function DisabledTimeInput() {
  return <TimeInput isDisabled />
}

export function ReadOnlyTimeInput() {
  return <TimeInput isReadOnly />
}
