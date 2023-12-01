import React, { useState } from 'react'
import { Stack } from '@vtex/shoreline-components'

import { DateField } from '../index'
import { parseDate } from '../../utils'

export default {
  title: 'date/date-field',
}

export function Default() {
  return <DateField label="Date" />
}

export function Controlled() {
  const [value, setValue] = useState(parseDate('2023-09-11'))

  return <DateField value={value} onChange={setValue} label="Date" />
}

export function Locale() {
  return <DateField label="Date" locale="ja-JP" />
}

export function Granularity() {
  return (
    <Stack>
      <DateField label="Day (default)" granularity="day" locale="pt-BR" />
      <DateField label="Hour" granularity="hour" locale="pt-BR" />
      <DateField label="Minute" granularity="minute" locale="pt-BR" />
      <DateField label="Second" granularity="second" locale="pt-BR" />
    </Stack>
  )
}
