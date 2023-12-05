import React, { useState } from 'react'
import {
  Bleed,
  IconButton,
  LocaleProvider,
  Stack,
} from '@vtex/shoreline-components'
import { IconCalendarBlank } from '@vtex/shoreline-icons'

import { DateField } from '../index'
import { parseDate } from '../../utils'

export default {
  title: 'date/date-field',
}

export function Default() {
  return <DateField label="Date" />
}

export function Terms() {
  return (
    <Stack>
      <DateField label="Date" />
      <DateField label="Date" prefix="Prefix" />
      <DateField label="Date" suffix="Suffix" />
      <DateField label="Date" prefix="Prefix" suffix="Suffix" />
      <DateField
        label="Date"
        prefix="Prefix"
        suffix={
          <Bleed vertical="$space-3" horizontal="$space-4">
            <IconButton
              label="calendar"
              size="large"
              variant="tertiary"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <IconCalendarBlank />
            </IconButton>
          </Bleed>
        }
      />
    </Stack>
  )
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
