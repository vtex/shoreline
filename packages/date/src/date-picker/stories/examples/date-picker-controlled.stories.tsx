import React, { useState } from 'react'
import { Stack } from '@vtex/shoreline-components'

import { DatePicker } from '../../index'
import { getLocalTimeZone, today } from '../../../utils'

export default {
  title: 'components/date-picker/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Controlled() {
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState(now)
  const [focusedValue, setFocusedValue] = useState(now)

  return (
    <Stack>
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
      <DatePicker value={value} onChange={setValue} />
    </Stack>
  )
}
