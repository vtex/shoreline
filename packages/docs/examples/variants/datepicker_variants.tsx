import { DatePicker } from '@vtex/shoreline'

export function DefaultDatePicker() {
  return <DatePicker />
}

export function DisabledDatePicker() {
  return <DatePicker isDisabled />
}

export function ReadOnlyDatePicker() {
  return <DatePicker isReadOnly />
}
