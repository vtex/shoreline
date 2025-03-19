import { Field, FieldDescription, Textarea, Label } from '@vtex/shoreline'

export default function Example() {
  return (
    <Field>
      <Label>Text area field</Label>
      <Textarea />
      <FieldDescription>Short description</FieldDescription>
    </Field>
  )
}
