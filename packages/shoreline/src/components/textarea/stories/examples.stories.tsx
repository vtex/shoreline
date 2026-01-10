import React from 'react'

import { Stack } from '../../stack'
import { Textarea } from '../index'

export default {
  title: 'components/textarea',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function NoResize() {
  const [value, setValue] = React.useState('')

  return (
    <Stack>
      <Textarea value={value} onChange={setValue} resizable={false} optional />
      <Textarea value={value} onChange={setValue} resizable={false} />
      <Textarea value={value} onChange={setValue} error resizable={false} />
      <Textarea value={value} onChange={setValue} disabled resizable={false} />
      <Textarea
        value="The quick brown fox is tired right now"
        disabled
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={setValue}
        maxLength={120}
        resizable={false}
      />
    </Stack>
  )
}

export function FormField() {
  const [value, setValue] = React.useState('')

  return <Textarea error value={value} onChange={setValue} maxLength={120} />
}

export function LongText() {
  const [value, setValue] = React.useState('')

  return (
    <Stack>
      <Textarea error value={value} onChange={setValue} maxLength={120} />

      <Textarea error value={value} onChange={setValue} />
    </Stack>
  )
}
