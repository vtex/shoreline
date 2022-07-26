import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Center } from './center'
import { Box } from '../box'

export default {
  title: 'admin-ui/center',
  component: Center,
} as Meta

export const Playground: Story = (args) => {
  return <Center {...args}>Center</Center>
}

Playground.args = {
  csx: { size: 200, bg: 'muted' },
}

export function Centralized() {
  return (
    <Center
      csx={{
        height: 200,
        bg: 'muted',
      }}
    >
      <Box as="h1">Center heading</Box>
    </Center>
  )
}
