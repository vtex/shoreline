import React, { useState } from 'react'
import { LocaleProvider, Stack } from '@vtex/shoreline-components'

import { TimeField } from '../index'
import { Time } from '../../utils'

export default {
  title: 'date/time-field',
}

export function Default() {
  return <TimeField label="Time" />
}

export function Terms() {
  return (
    <Stack>
      <TimeField label="Time" />
      <TimeField label="Time" prefix="Prefix" />
      <TimeField label="Time" suffix="Suffix" />
      <TimeField label="Time" prefix="Prefix" suffix="Suffix" />
    </Stack>
  )
}

export function Controlled() {
  const [value, setValue] = useState(new Time(11, 45))

  return <TimeField value={value} onChange={setValue} label="Time" />
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <TimeField label="Time" />
    </LocaleProvider>
  )
}

export function Granularity() {
  return (
    <Stack>
      <TimeField label="Hour" granularity="hour" />
      <TimeField label="Minute" granularity="minute" />
      <TimeField label="Second" granularity="second" />
    </Stack>
  )
}
