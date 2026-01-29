import { useState } from 'react'
import { DatePicker } from '@vtex/shoreline'
import { getLocalTimeZone, today } from '@vtex/shoreline/src/components/utils'

export function DefaultDatePicker() {
  return <DatePicker />
}

export function DisabledDatePicker() {
  return <DatePicker isDisabled />
}

export function ReadOnlyDatePicker() {
  return <DatePicker isReadOnly />
}

export function DatePickerWithError() {
  return <DatePicker error />
}

export function DatePickerControlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState(now)

  return <DatePicker value={value} onChange={setValue} />
}
