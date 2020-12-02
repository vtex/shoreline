import React from 'react'
import { Meta } from '@storybook/react'

import { Flex } from './index'
import { Box } from '../Box'

export default {
  title: 'primitives/Flex',
  component: Flex,
} as Meta

export function Basic() {
  const boxStyles = {}

  return (
    <Flex>
      <Box
        styles={{
          bg: 'red',
          size: 100,
          ...boxStyles,
        }}
      >
        Box 1
      </Box>
      <Box
        styles={{
          bg: 'green',
          size: 150,
          ...boxStyles,
        }}
      >
        Box 2
      </Box>
      <Box
        styles={{
          bg: 'blue',
          ...boxStyles,
        }}
      >
        Box 3
      </Box>
    </Flex>
  )
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
