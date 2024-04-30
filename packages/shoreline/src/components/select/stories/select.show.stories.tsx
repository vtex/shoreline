import React, { useState } from 'react'

import { Select, SelectItem } from '../index'
import { Stack } from '../../stack'
import { Field, FieldDescription, FieldError } from '../../field'
import { Label } from '../../label'

export default {
  title: 'components/select',
}

export function Show() {
  return (
    <Stack>
      <Field>
        <Label>Fruit</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
      </Field>
      <Field>
        <Label>Fruit</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldDescription>Short description</FieldDescription>
      </Field>
      <Field error>
        <Label>Fruit</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldError>Short error message</FieldError>
      </Field>
      <Field error>
        <Label>Fruit</Label>
        <Select>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Short error message</FieldError>
      </Field>
      <Field error>
        <Label>Fruit</Label>
        <Select disabled>
          <SelectItem value="Apple">Apple</SelectItem>
          <SelectItem value="Banana">Banana</SelectItem>
          <SelectItem value="Grape">Grape</SelectItem>
        </Select>
        <FieldDescription>Short description</FieldDescription>
        <FieldError>Short error message</FieldError>
      </Field>
    </Stack>
  )
}
