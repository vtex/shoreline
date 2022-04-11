import React from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from './index'
import { Button } from '../button'

export default {
  title: 'admin-ui/stack',
  component: Stack,
} as Meta

export const StackLayout = () => {
  return (
    <Stack>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
      <Button>Fith</Button>
      <Button>Six</Button>
      <Button>Seventh</Button>
      <Button>Eight</Button>
    </Stack>
  )
}

export const ArbitraryValues = () => {
  return (
    <Stack space="2rem">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Stack>
  )
}

export const DirectionRow = () => {
  return (
    <Stack direction="row">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Stack>
  )
}

export const AlignEnd = () => {
  return (
    <Stack align="end">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </Stack>
  )
}

export const Responsive = () => {
  return (
    <Stack
      direction={{
        mobile: 'column',
        tablet: 'row',
      }}
      fluid
    >
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
      <Button>Fourth</Button>
      <Button>Fith</Button>
    </Stack>
  )
}
