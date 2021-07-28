import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Flex } from './index'
import { Primitive } from '../Primitive'

export default {
  title: 'primitives/Flex',
  component: Flex,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Flex {...args}>
      <Primitive
        csx={{
          bg: 'red',
          size: 100,
        }}
      >
        Primitive 1
      </Primitive>
      <Primitive
        csx={{
          bg: 'green',
          size: 150,
        }}
      >
        Primitive 2
      </Primitive>
      <Primitive
        csx={{
          bg: 'blue',
        }}
      >
        Primitive 3
      </Primitive>
    </Flex>
  )
}

Playground.args = {
  csx: { height: 200, width: 600 },
}

export function WithSpacer() {
  const Primitivecsx = {
    size: 100,
  }

  return (
    <Flex>
      <Primitive
        csx={{
          bg: 'red',
          ...Primitivecsx,
        }}
      >
        Primitive 1
      </Primitive>
      <Flex.Spacer />
      <Primitive
        csx={{
          bg: 'green',
          ...Primitivecsx,
        }}
      >
        Primitive 2
      </Primitive>
    </Flex>
  )
}

export function Around() {
  const Primitivecsx = {
    size: 100,
  }

  return (
    <Flex justify="space-around">
      <Primitive
        csx={{
          bg: 'red',
          ...Primitivecsx,
        }}
      >
        Primitive 1
      </Primitive>
      <Primitive
        csx={{
          bg: 'green',
          ...Primitivecsx,
        }}
      >
        Primitive 2
      </Primitive>
    </Flex>
  )
}
