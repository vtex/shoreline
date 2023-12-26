import React, { useState } from 'react'
import { Field, FieldCharCounter, FieldDescription, FieldError } from '..'
import { Label } from '../../label'
import { Input } from '../../input'
import { Textarea } from '../../textarea'
import { Slot } from '../../slot'

export default {
  title: 'components/field',
}

export function Default() {
  return (
    <Field>
      <Label>Label</Label>
      <Input />
      <FieldDescription>Short description</FieldDescription>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}

export function Multiline() {
  return (
    <Field>
      <Label>Label</Label>
      <Textarea />
      <FieldDescription>Short description</FieldDescription>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}

export function Count() {
  const [value, setValue] = useState('')

  return (
    <Field>
      <Label>Label</Label>
      <Textarea value={value} onChange={setValue} maxLength={120} />
      <Slot>
        <FieldDescription>Short description</FieldDescription>
        <FieldCharCounter count={String(value).length} limit={120} />
      </Slot>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}

export function Error() {
  return (
    <Field error>
      <Label>Label</Label>
      <Input />
      <FieldDescription>Short description</FieldDescription>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}

export function Controlled() {
  const [value, setValue] = useState('default value')

  return (
    <Field>
      <Label>Label</Label>
      <Input value={value} onChange={setValue} />
      <div>value: {value}</div>
    </Field>
  )
}
