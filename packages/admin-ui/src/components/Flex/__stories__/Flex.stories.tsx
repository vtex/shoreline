import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import { Flex, FlexSpacer } from '../index'

export default {
  title: 'admin-ui/Flex',
  component: Flex,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Flex {...args}>
      <tag.div
        csx={{
          bg: 'red',
          size: 100,
        }}
      >
        tag.div 1
      </tag.div>
      <tag.div
        csx={{
          bg: 'green',
          size: 150,
        }}
      >
        tag.div 2
      </tag.div>
      <tag.div
        csx={{
          bg: 'blue',
        }}
      >
        tag.div 3
      </tag.div>
    </Flex>
  )
}

Playground.args = {
  csx: { height: 200, width: 600 },
}

export function WithSpacer() {
  return (
    <Flex>
      <tag.div
        csx={{
          bg: 'red',
          size: 100,
        }}
      >
        tag.div 1
      </tag.div>
      <FlexSpacer />
      <tag.div
        csx={{
          bg: 'green',
          size: 100,
        }}
      >
        tag.div 2
      </tag.div>
    </Flex>
  )
}

export function Around() {
  return (
    <Flex justify="space-around">
      <tag.div
        csx={{
          bg: 'red',
          size: 100,
        }}
      >
        tag.div 1
      </tag.div>
      <tag.div
        csx={{
          bg: 'green',
          size: 100,
        }}
      >
        tag.div 2
      </tag.div>
    </Flex>
  )
}
