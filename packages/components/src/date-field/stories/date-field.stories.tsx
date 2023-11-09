import '../../../dist/styles.min.css'
import '../date-field.css'
import React, { useState } from 'react'

import { DateField, parseDate } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/date-field',
}

export function Default() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <DateField label="Date" />
    </div>
  )
}

export function Controlled() {
  const [value, setValue] = useState(parseDate('2023-09-11'))

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <DateField value={value} onChange={setValue} label="Date" />
    </div>
  )
}

export function Locale() {
  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      <DateField label="Date" locale="ja-JP" />
    </div>
  )
}

export function Granularity() {
  return (
    <Stack
      style={{
        padding: '1rem',
      }}
    >
      <DateField label="Day (default)" granularity="day" locale="pt-BR" />
      <DateField label="Hour" granularity="hour" locale="pt-BR" />
      <DateField label="Minute" granularity="minute" locale="pt-BR" />
      <DateField label="Second" granularity="second" locale="pt-BR" />
    </Stack>
  )
}
