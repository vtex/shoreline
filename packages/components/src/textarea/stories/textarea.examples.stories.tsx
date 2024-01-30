import './style.css'
import React from 'react'

import { Textarea } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/textarea/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function NoResize() {
  const [value, setValue] = React.useState('')

  return (
    <>
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        resizable={false}
        optional
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        error
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        disabled
        resizable={false}
      />
      <Textarea
        value="The quick brown fox is tired right now"
        className="textarea-container"
        disabled
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={setValue}
        className="textarea-container"
        maxLength={120}
        resizable={false}
      />
    </>
  )
}

export function FormField() {
  const [value, setValue] = React.useState('')

  return (
    <Textarea
      error
      className="textarea-container"
      value={value}
      onChange={setValue}
      maxLength={120}
    />
  )
}

export function LongText() {
  const [value, setValue] = React.useState('')

  return (
    <Stack>
      <Textarea
        error
        className="textarea-container"
        value={value}
        onChange={setValue}
        maxLength={120}
      />

      <Textarea
        error
        className="textarea-container"
        value={value}
        onChange={setValue}
      />
    </Stack>
  )
}
