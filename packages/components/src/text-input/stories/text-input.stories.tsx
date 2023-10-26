import '../../../dist/styles.min.css'

import React from 'react'

import { TextInput } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/text-input',
}

export function Default() {
  return <TextInput label="test" />
}

export function All() {
  return (
    <Stack>
      <TextInput label="Label" error />
      <TextInput label="Label" disabled />
      <TextInput label="Label" prefix="a" />
      <TextInput label="Label" suffix="suffix" />
      <TextInput label="Label" prefix="pre" suffix="suffix" />

      <TextInput label="Label" errorText="Something went wrong" error />
      <TextInput
        label="Label"
        errorText="Something went wrong"
        helpText="This is an input"
        error
      />
      <TextInput label="Label" helpText="This is an input" />
    </Stack>
  )
}
