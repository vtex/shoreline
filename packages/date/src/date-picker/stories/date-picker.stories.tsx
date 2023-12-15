import React, { useState } from 'react'
import { LocaleProvider, Stack } from '@vtex/shoreline-components'

import { DatePicker } from '../index'
import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'date/date-picker',
}

export function Default() {
  return <DatePicker label="Date" />
}

export function Controlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState(now)
  const [focusedValue, setFocusedValue] = useState(now)

  return (
    <Stack>
      <p>Selected Date: {value?.toString() ?? 'none'}</p>
      <p>Focused Date: {focusedValue?.toString() ?? 'none'}</p>
      <button
        onClick={() => {
          setValue(now)
          setFocusedValue(now)
        }}
      >
        Today
      </button>
      <DatePicker label="Date" value={value} onChange={setValue} />
    </Stack>
  )
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <DatePicker label="日付" />
    </LocaleProvider>
  )
}
