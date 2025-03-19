import { useState } from 'react'
import { Field, FieldDescription, FieldError } from '../../field'
import { LocaleProvider } from '../../locale'
import { Label } from '../../label'
import { Stack } from '../../stack'
import { DateRangePicker } from '../index'
import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'components/date-range-picker',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function WithField() {
  return (
    <Field error>
      <Label>Event dates</Label>
      <DateRangePicker />
      <FieldDescription>The date start and end of the event</FieldDescription>
      <FieldError>Something went wrong</FieldError>
    </Field>
  )
}

export function Controlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState({
    start: now,
    end: now.add({ days: 2 }),
  })

  return (
    <Stack>
      <p>Start Date: {value.start.toString()}</p>
      <p>End Date: {value.end.toString()}</p>
      <DateRangePicker value={value} onChange={setValue} />
    </Stack>
  )
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <DateRangePicker />
    </LocaleProvider>
  )
}

export function Disabled() {
  const now = today(getLocalTimeZone())

  return (
    <Field>
      <Label>Date</Label>
      <DateRangePicker
        value={{ start: now, end: now.add({ days: 2 }) }}
        isDisabled
      />
      <FieldDescription>The event starting date</FieldDescription>
    </Field>
  )
}
