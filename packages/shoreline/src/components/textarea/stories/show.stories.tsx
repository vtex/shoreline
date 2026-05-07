import React from 'react'

import { Stack } from '../../stack'
import { Textarea } from '../index'

export default {
  title: 'components/textarea',
}

export function Show() {
  const [value, setValue] = React.useState('')

  return (
    <Stack>
      <Textarea value={value} onChange={setValue} maxLength={120} />
      <Textarea value={value} onChange={setValue} optional />
      <Textarea value={value} onChange={setValue} />
      <Textarea value={value} onChange={setValue} error />
      <Textarea value={value} onChange={setValue} disabled />
      <Textarea value="The quick brown fox is tired right now" disabled />
      <Textarea value={value} onChange={setValue} maxLength={120} />
    </Stack>
  )
}
