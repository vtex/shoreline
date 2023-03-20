import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Center } from './center'
import { Box } from '../box'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui/center',
  component: Center,
} as Meta

export const Playground: Story = (args) => {
  return <Center {...args}>Center</Center>
}

Playground.args = {
  className: csx({
    height: 200,
    bg: '$secondary',
  }),
}

export function Centralized() {
  return (
    <Center
      className={csx({
        height: 200,
        bg: '$secondary',
      })}
    >
      <Box as="h1">Center heading</Box>
    </Center>
  )
}
