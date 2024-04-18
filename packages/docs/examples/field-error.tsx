import React from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  Input,
  Label,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Field error>
      <Label>Label</Label>
      <Input />
      <FieldDescription>Short description</FieldDescription>
      <FieldError>Error message</FieldError>
    </Field>
  )
}
