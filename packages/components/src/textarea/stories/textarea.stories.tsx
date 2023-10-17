import React from 'react'

import { Textarea } from '../index'
import { Field, FieldLabel, FieldMessage } from '../../field'
import { storyStyle } from './textarea.stories.css'

export default {
  title: 'shoreline-components/textarea',
}

export function Default() {
  const [value, setValue] = React.useState('')

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={storyStyle}
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
        className={storyStyle}
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={storyStyle}
        error
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={storyStyle}
        disabled
      />
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={storyStyle}
        maxLength={120}
      />
    </>
  )
}

export function FormField() {
  const [value, setValue] = React.useState('')

  return (
    <Field className={storyStyle} error>
      <FieldLabel>Label</FieldLabel>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={120}
      />
      <FieldMessage helpText="Help text" errorText="Error text" />
    </Field>
  )
}
