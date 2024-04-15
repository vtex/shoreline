import React from 'react'
import { Stack } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <Stack>
      <DecorativeBox width="128px" height="64px" />
      <DecorativeBox width="128px" height="64px" />
      <DecorativeBox width="128px" height="64px" />
    </Stack>
  )
}
