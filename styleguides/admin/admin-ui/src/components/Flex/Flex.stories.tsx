import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Flex, FlexProps, useFlex } from './index'
import { Box } from '../Box'
import { Card, CardProps } from '../Card'

export default {
  title: 'primitives/Flex',
  component: Flex,
} as Meta

export const Playground: Story = (args) => {
  return (
    <Flex {...args}>
      <Box
        styles={{
          bg: 'red',
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        styles={{
          bg: 'green',
          size: 150,
        }}
      >
        Box 2
      </Box>
      <Box
        styles={{
          bg: 'blue',
        }}
      >
        Box 3
      </Box>
    </Flex>
  )
}

Playground.args = {
  styles: { height: 200, width: 600 },
}

export function WithSpacer() {
  const boxStyles = {
    size: 100,
  }

  return (
    <Flex>
      <Box
        styles={{
          bg: 'red',
          ...boxStyles,
        }}
      >
        Box 1
      </Box>
      <Flex.Spacer />
      <Box
        styles={{
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
        styles={{
          bg: 'red',
          ...boxStyles,
        }}
      >
        Box 1
      </Box>
      <Box
        styles={{
          bg: 'green',
          ...boxStyles,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function LowLevel() {
  function FlexCard(props: FlexProps & CardProps) {
    const flexProps = useFlex(props)

    return <Card {...flexProps} />
  }

  return (
    <FlexCard justify="space-around">
      <Box
        styles={{
          bg: 'red',
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        styles={{
          bg: 'green',
          size: 100,
        }}
      >
        Box 2
      </Box>
    </FlexCard>
  )
}
