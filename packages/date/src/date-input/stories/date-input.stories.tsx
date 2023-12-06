import React, { useState } from 'react'
import { LocaleProvider, Stack } from '@vtex/shoreline-components'

import { parseDate } from '../../utils'
import { DateInput } from '../index'

export default {
  title: 'date/date-input',
}

export function Default() {
  return <DateInput />
}

export function Controlled() {
  const [value, setValue] = useState(parseDate('2023-09-11'))

  return <DateInput value={value} onChange={setValue} />
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JO">
      <DateInput />
    </LocaleProvider>
  )
}

export function Granularity() {
  return (
    <LocaleProvider locale="pt-BR">
      <Stack>
        <DateInput granularity="day" />
        <DateInput granularity="hour" />
        <DateInput granularity="minute" />
        <DateInput granularity="second" />
      </Stack>
    </LocaleProvider>
  )
}
