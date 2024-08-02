import { useState } from 'react'
import { Field, FieldCharCounter, FieldDescription, FieldError } from '..'
import { Label } from '../../label'
import { Input } from '../../input'
import { Textarea } from '../../textarea'
import { Stack } from '../../stack'
import { Flex } from '../../flex'

export default {
  title: 'components/field',
}

export function Show() {
  const [value, setValue] = useState('')

  return (
    <Stack fluid>
      <Field>
        <Label>Simple</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Error Message</FieldError>
      </Field>

      <Field>
        <Label>Multiline</Label>
        <Textarea />
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Error Message</FieldError>
      </Field>

      <Field>
        <Label>Count</Label>
        <Textarea value={value} onChange={setValue} maxLength={120} />
        <Flex justify="space-between">
          <FieldDescription>Short description</FieldDescription>
          <FieldCharCounter count={String(value).length} limit={120} />
        </Flex>
        <FieldError>Error Message</FieldError>
      </Field>

      <Field error>
        <Label>With error</Label>
        <Input />
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Error Message</FieldError>
      </Field>
    </Stack>
  )
}
