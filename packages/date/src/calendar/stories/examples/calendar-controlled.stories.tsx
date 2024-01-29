import React, { useState } from 'react'

import { Calendar } from '../../index'
import { getLocalTimeZone, today } from '../../../utils'

export default {
  title: 'date/calendar/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Controlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState(now)
  const [focusedValue, setFocusedValue] = useState(now)

  return (
    <>
      <p>Selected Date: {value.toString()}</p>
      <p>Focused Date: {focusedValue.toString()}</p>

      <button
        onClick={() => {
          setValue(now)
          setFocusedValue(now)
        }}
      >
        Today
      </button>
      <Calendar
        value={value}
        onChange={setValue}
        focusedValue={focusedValue}
        onFocusChange={setFocusedValue}
      />
    </>
  )
}
