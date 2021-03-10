import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Flex } from './index'
import { Box } from '@vtex/admin-primitives'

export default {
  title: 'admin-ui/Flex',
  component: Flex,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Flex {...args}>
      <Box
        csx={{
          bg: 'red',
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          bg: 'green',
          size: 150,
        }}
      >
        Box 2
      </Box>
      <Box
        csx={{
          bg: 'blue',
        }}
      >
        Box 3
      </Box>
    </Flex>
  )
}

Playground.args = {
  csx: { height: 200, width: 600 },
}

export function WithSpacer() {
  const boxStyles = {
    size: 100,
  }

  return (
    <Flex>
      <Box
        csx={{
          bg: 'red',
          ...boxStyles,
        }}
      >
        Box 1
      </Box>
      <Flex.Spacer />
      <Box
        csx={{
          bg: 'green',
          ...boxStyles,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function Around() {
  const boxStyles = {
    size: 100,
  }

  return (
    <Flex justify="space-around">
      <Box
        csx={{
          bg: 'red',
          ...boxStyles,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          bg: 'green',
          ...boxStyles,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}
