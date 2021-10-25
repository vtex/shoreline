import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import { Center } from '../index'

export default {
  title: 'admin-ui/Center',
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
      <tag.h1>Center heading</tag.h1>
    </Center>
  )
}
