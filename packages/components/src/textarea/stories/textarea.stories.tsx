import './style.css'
import React from 'react'

import { Textarea } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/textarea',
}

export function Default() {
  const [value, setValue] = React.useState('')

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="textarea-container"
      maxLength={120}
    />
  )
}

export function All() {
  const [value, setValue] = React.useState('')

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        label="Label"
        optional
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        error
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        disabled
      />
      <Textarea
        label="label"
        value="The quick brown fox is tired right now"
        className="textarea-container"
        disabled
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        maxLength={120}
      />
    </>
  )
}

export function withoutResize() {
  const [value, setValue] = React.useState('')

  return (
    <>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        label="Label"
        resizable={false}
        optional
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        error
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        disabled
        resizable={false}
      />
      <Textarea
        label="label"
        value="The quick brown fox is tired right now"
        className="textarea-container"
        disabled
        resizable={false}
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
      label="Label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={120}
      helpText="Help text"
      errorText="Error text"
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
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={120}
        helpText="The quick brown fox jumps over the lazy dog lorem ipsum this is a long help text"
        errorText="Error text"
      />

      <Textarea
        error
        className="textarea-container"
        label="Label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helpText="The quick brown fox jumps over the lazy dog lorem ipsum this is a long help text"
        errorText="Error text"
      />
    </Stack>
  )
}
