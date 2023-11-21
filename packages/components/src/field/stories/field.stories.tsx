import React from 'react'
import { Checkbox, Radio } from '@ariakit/react'

import { Field, FieldLabel, FieldMessage } from '../index'
import { Stack } from '../../stack'
import './style.css'

export default {
  title: 'shoreline-components/field',
}

function TextArea() {
  return (
    <div data-sl-textarea className="input-container">
      <textarea />
    </div>
  )
}

function TextInput() {
  return (
    <div data-sl-textinput className="input-container">
      <input />
    </div>
  )
}

export function Default() {
  return (
    <form>
      <Stack space="$space-6">
        <Field>
          <FieldLabel>Label</FieldLabel>
          <TextInput />
          <FieldMessage helpText="Help text" errorText="Error text" />
        </Field>

        <Field variant="control">
          <FieldLabel>Label</FieldLabel>
          <Checkbox data-sl-checkbox />

          <FieldMessage error helpText="Help text" errorText="Error text" />
        </Field>

        <div>
          <Stack space="$space-1">
            <Field variant="control">
              <FieldLabel>Label</FieldLabel>
              <Radio value="radio-1" data-sl-radio />

              <FieldMessage helpText="Help text" errorText="Error text" />
            </Field>
            <Field variant="control">
              <FieldLabel>Label</FieldLabel>
              <Radio value="radio-2" data-sl-radio />

              <FieldMessage helpText="Help text" errorText="Error text" />
            </Field>
            <Field variant="control">
              <FieldLabel>Label</FieldLabel>
              <Radio value="radio-3" data-sl-radio />

              <FieldMessage helpText="Help text" errorText="Error text" />
            </Field>
          </Stack>
        </div>

        <Field>
          <FieldLabel>Label</FieldLabel>
          <TextArea />

          <FieldMessage helpText="Help text" errorText="Error text" />
        </Field>
      </Stack>
    </form>
  )
}

export function Group() {
  return (
    <form>
      <Field variant="group">
        <FieldLabel>Group label</FieldLabel>
        <Stack space="$space-4">
          <Field variant="control">
            <FieldLabel>Label</FieldLabel>
            <Radio value="radio-2" data-sl-radio />
          </Field>
          <Field variant="control">
            <FieldLabel>Label</FieldLabel>
            <Radio value="radio-2" data-sl-radio />
          </Field>
          <Field variant="control">
            <FieldLabel>Label</FieldLabel>
            <Radio value="radio-2" data-sl-radio />
          </Field>
        </Stack>
        <FieldMessage helpText="Heres a message" />
      </Field>
    </form>
  )
}
