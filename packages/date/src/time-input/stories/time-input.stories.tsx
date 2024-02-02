import React, { useState } from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  Label,
  LocaleProvider,
  Stack,
} from '@vtex/shoreline-components'

import { TimeInput } from '../index'
import { Time } from '../../utils'

export default {
  title: 'date/time-input',
}

export function Default() {
  return (
    <Field>
      <Label>Time</Label>
      <TimeInput />
      <FieldDescription>Defines the event time</FieldDescription>
    </Field>
  )
}

export function Error() {
  return (
    <Field error>
      <Label>Time</Label>
      <TimeInput />
      <FieldDescription>Defines the event time</FieldDescription>
      <FieldError>Error Message</FieldError>
    </Field>
  )
}

export function Controlled() {
  const [value, setValue] = useState(new Time(11, 45))

  return (
    <Field>
      <Label>Time</Label>
      <TimeInput value={value} onChange={setValue} />
      <FieldDescription>Defines the event time</FieldDescription>
    </Field>
  )
}

export function Locale() {
  return (
    <LocaleProvider locale="ja-JP">
      <Field>
        <Label>Time</Label>
        <TimeInput />
      </Field>
    </LocaleProvider>
  )
}

export function Granularity() {
  return (
    <Stack>
      <Field>
        <Label>Hour</Label>
        <TimeInput granularity="hour" />
      </Field>
      <Field>
        <Label>Minute</Label>
        <TimeInput granularity="minute" />
      </Field>
      <Field>
        <Label>Second</Label>
        <TimeInput granularity="second" />
      </Field>
    </Stack>
  )
}
