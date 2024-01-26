import React, { useState } from 'react'
import { Field, FieldCharCounter, FieldDescription, FieldError } from '..'
import { Label } from '../../label'
import { Input } from '../../input'
import { Textarea } from '../../textarea'
import { Slot } from '../../slot'
import { Stack } from '../../stack'

export default {
  title: 'components/field',
}

export function Show() {
  const [value, setValue] = useState('')

  return (
    <Stack>
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
        <Slot>
          <FieldDescription>Short description</FieldDescription>
          <FieldCharCounter count={String(value).length} limit={120} />
        </Slot>
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
