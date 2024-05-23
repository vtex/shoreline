import { useState } from 'react'
import { LocaleProvider } from '../../locale'

import { RangeCalendar } from '../index'
import { getLocalTimeZone, today } from '../../utils'

export default {
  title: 'components/range-calendar',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
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
