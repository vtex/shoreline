import React, { useState } from 'react'
import { LocaleProvider, Stack } from '@vtex/shoreline-components'

import { DateRangePicker } from '../index'
import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'date/date-range-picker',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Default() {
  return <DateRangePicker label="Date range" />
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
      <DateRangePicker label="Date range" value={value} onChange={setValue} />
    </Stack>
  )
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <DateRangePicker label="日付" />
    </LocaleProvider>
  )
}
