import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { DateInput } from '../date-input'
import type { DateObject } from '../../calendar'

export default {
  title: 'admin-ui-review/date-input',
} as Meta

export const Uncontrolled = () => {
  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <DateInput label="Uncontrolled" />
    </Stack>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState('')

  console.log({ value })

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <DateInput
        label="Controlled"
        value={value}
        onChange={(value) => setValue(value)}
        helpText={<>State: {value}</>}
      />
    </Stack>
  )
}

export const ControlledAsDate = () => {
  const [value, setValue] = useState<DateObject>({
    day: 0,
    month: 0,
    year: 0,
  })

  console.log({ value })

  return (
    <Stack space="$l" csx={{ padding: '$s' }} fluid>
      <DateInput
        asDate
        label="Controlled"
        value={value}
        onChange={(value) => setValue(value)}
        helpText={
          <>
            State: d: {value.day} m: {value.month} y:{value.year}
          </>
        }
      />
    </Stack>
  )
}
