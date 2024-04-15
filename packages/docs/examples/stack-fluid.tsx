import React from 'react'
import { Stack } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Stack fluid>
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
      <DecorativeBox height="64px" />
    </Stack>
  )
}
