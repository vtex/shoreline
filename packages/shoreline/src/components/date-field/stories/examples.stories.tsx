import { useState } from 'react'
import { LocaleProvider } from '../../locale'
import { Stack } from '../../stack'

import { DateField } from '../index'
import { parseDate } from '../../utils'

export default {
  title: 'components/date-field',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Controlled() {
  const [value, setValue] = useState(parseDate('2023-09-11'))

  return <DateField value={value} onChange={setValue} label="Date" />
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JO">
      <DateField label="Date" />
    </LocaleProvider>
  )
}

export function Granularity() {
  return (
    <LocaleProvider locale="pt-BR">
      <Stack>
        <DateField label="Day (default)" granularity="day" />
        <DateField label="Hour" granularity="hour" />
        <DateField label="Minute" granularity="minute" />
        <DateField label="Second" granularity="second" />
      </Stack>
    </LocaleProvider>
  )
}
