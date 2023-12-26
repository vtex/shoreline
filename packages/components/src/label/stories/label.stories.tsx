import React from 'react'

import { Label } from '../index'
import { Stack } from '../../stack'
import { LocaleProvider } from '@vtex/shoreline-primitives'

export default {
  title: 'components/label',
}

export function Default() {
  return <Label>Label</Label>
}

export function Optional() {
  return <Label optional>Label</Label>
}

export function Localization() {
  return (
    <LocaleProvider locale="ja-JP">
      <Label optional>Label</Label>
    </LocaleProvider>
  )
}

export function Inputs() {
  return (
    <Stack role="group" space="$space-1">
      <Label htmlFor="example">Label</Label>
      <input id="example" />
    </Stack>
  )
}
