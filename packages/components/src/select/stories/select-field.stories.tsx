import React, { useState } from 'react'

import { Select } from '../index'
import { Stack } from '../../stack'
import { Field, FieldDescription, FieldError } from '../../field'
import { Label } from '../../label'

export default {
  title: 'components/select',
}

export function Default() {
  const [value, setValue] = useState('')

  return (
    <Field>
      <Label>Favorite fruit</Label>
      <Select value={value} onChange={setValue}>
        <option>Apple</option>
        <option>Banana</option>
        <option>Grape</option>
      </Select>
      <FieldDescription>The fruit you most like eating</FieldDescription>
    </Field>
  )
}

export function All() {
  return (
    <Stack>
      <Field>
        <Label>Fruit</Label>
        <Select>
          <option>Apple</option>
          <option>Banana</option>
          <option>Grape</option>
        </Select>
      </Field>

      <Field>
        <Label>Fruit</Label>
        <Select>
          <option>Apple</option>
          <option>Banana</option>
          <option>Grape</option>
        </Select>
        <FieldDescription>Short description</FieldDescription>
      </Field>

      <Field error>
        <Label>Fruit</Label>
        <Select>
          <option>Apple</option>
          <option>Banana</option>
          <option>Grape</option>
        </Select>
        <FieldError>Short error message</FieldError>
      </Field>

      <Field error>
        <Label>Fruit</Label>
        <Select>
          <option>Apple</option>
          <option>Banana</option>
          <option>Grape</option>
        </Select>
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Short error message</FieldError>
      </Field>

      <Field error>
        <Label>Fruit</Label>
        <Select disabled>
          <option>Apple</option>
          <option>Banana</option>
          <option>Grape</option>
        </Select>
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Short error message</FieldError>
      </Field>
    </Stack>
  )
}
