import '../../../dist/styles.min.css'
import './style.css'
import React from 'react'

import { Textarea } from '../index'

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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea-container"
        maxLength={120}
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
