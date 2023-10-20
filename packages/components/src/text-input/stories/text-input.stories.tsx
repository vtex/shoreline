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
    <Stack space="1rem">
      <TextInput label="" error />
      <TextInput label="" disabled />
      <TextInput label="" prefix="a" />
      <TextInput label="" suffix="suffix" />
      <TextInput label="" prefix="pre" suffix="suffix" />

      <TextInput label="" errorText="Something went wrong" error />
      <TextInput
        label=""
        errorText="Something went wrong"
        helpText="This is an input"
        error
      />
      <TextInput label="" helpText="This is an input" />
    </Stack>
  )
}
