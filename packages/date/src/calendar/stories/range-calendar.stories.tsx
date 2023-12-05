import React, { useState } from 'react'
import { LocaleProvider } from '@vtex/shoreline-components'

import { RangeCalendar } from '../index'
import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'date/range-calendar',
}

export function Default() {
  return <RangeCalendar />
}

export function Controlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState({
    start: now,
    end: now.add({ days: 2 }),
  })

  return (
    <>
      <p>Start Date: {value.start.toString()}</p>
      <p>End Date: {value.end.toString()}</p>

      <RangeCalendar value={value} onChange={setValue} />
    </>
  )
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <RangeCalendar />
    </LocaleProvider>
  )
}
