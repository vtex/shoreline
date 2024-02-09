import React from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  Label,
} from '@vtex/shoreline-components'

import { DatePicker } from '../../index'

export default {
  title: 'components/date-picker/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function AsField() {
  return (
    <Field error>
      <Label>Date</Label>
      <DatePicker />
      <FieldDescription>The event starting date</FieldDescription>
      <FieldError>Something went wrong</FieldError>
    </Field>
  )
}
