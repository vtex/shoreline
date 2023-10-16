import React from 'react'

import { TextInput } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/text-input',
}

export function Default() {
  return <TextInput />
}

export function All() {
  return (
    <Stack space="1rem">
      <TextInput error />
      <TextInput disabled />
      <TextInput prefix="a" />
      <TextInput suffix="suffix" />
      <TextInput prefix="pre" suffix="suffix" />
    </Stack>
  )
}
