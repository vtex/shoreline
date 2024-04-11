import React from 'react'
import { Checkbox, Field, FieldDescription, FieldError } from '@vtex/shoreline'

export default function Example() {
  return (
    <Field error>
      <Checkbox>Terms and conditions</Checkbox>
      <FieldDescription>
        By clicking you agree with terms and conditions
      </FieldDescription>
      <FieldError>Something wrong</FieldError>
    </Field>
  )
}
