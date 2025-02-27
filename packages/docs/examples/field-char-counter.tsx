import { useState } from 'react'
import {
  Field,
  FieldDescription,
  Textarea,
  Label,
  FieldCharCounter,
  FieldError,
  Flex,
} from '@vtex/shoreline'

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Field>
      <Label>Count</Label>
      <Textarea value={value} onChange={setValue} maxLength={120} />
      <Flex justify="space-between">
        <FieldDescription>Short description</FieldDescription>
        <FieldCharCounter count={String(value).length} limit={120} />
      </Flex>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}
