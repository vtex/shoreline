import { useState } from 'react'
import { DateRangePicker } from '@vtex/shoreline'
import { getLocalTimeZone, today } from '@vtex/shoreline/src/components/utils'

export function DefaultDateRangePicker() {
  return <DateRangePicker />
}

export function DisabledDateRangePicker() {
  return <DateRangePicker isDisabled />
}

export function ReadOnlyDateRangePicker() {
  return <DateRangePicker isReadOnly />
}

export function DateRangePickerWithError() {
  return <DateRangePicker error />
}

export function DateRangePickerControlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState({
    start: now,
    end: now.add({ days: 2 }),
  })

  return <DateRangePicker value={value} onChange={setValue} />
}
