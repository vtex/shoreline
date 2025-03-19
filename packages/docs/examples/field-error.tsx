import { Field, FieldError, Input, Label } from '@vtex/shoreline'

export default function Example() {
  return (
    <Field error>
      <Label>Label</Label>
      <Input />
      <FieldError>Error message</FieldError>
    </Field>
  )
}
