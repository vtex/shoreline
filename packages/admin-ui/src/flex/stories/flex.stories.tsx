import React from 'react'
import type { Meta } from '@storybook/react'
import { palette } from '@vtex/admin-ui-core'

import { Box } from '../../box'
import { Flex, FlexSpacer } from '../index'

export default {
  title: 'admin-ui-review/flex',
  component: Flex,
} as Meta

export const Example = () => {
  return (
    <Flex>
      <Box
        csx={{
          ...palette('cyan'),
          size: 200,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          ...palette('teal'),
          size: 200,
        }}
      >
        Box 2
      </Box>
      <Box csx={{ ...palette('purple'), size: 200 }}>Box 3</Box>
    </Flex>
  )
}

export function Spacer() {
  return (
    <Flex>
      <Box
        csx={{
          ...palette('cyan'),
          size: 200,
        }}
      >
        Box 1
      </Box>
      <FlexSpacer />
      <Box
        csx={{
          ...palette('teal'),
          size: 200,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function Around() {
  return (
    <Flex justify="space-around">
      <Box
        csx={{
          ...palette('teal'),
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          ...palette('purple'),
          size: 100,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function Direction() {
  return (
    <Flex direction="column">
      <Box
        csx={{
          ...palette('teal'),
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          ...palette('purple'),
          size: 100,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function Align() {
  return (
    <Flex align="center" csx={{ size: 300, bg: '$secondary' }}>
      <Box
        csx={{
          ...palette('teal'),
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          ...palette('purple'),
          size: 100,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}

export function Responsive() {
  return (
    <Flex
      align={{ mobile: 'center', tablet: 'flex-start', desktop: 'flex-end' }}
      direction={{ mobile: 'column', tablet: 'row' }}
      justify="space-around"
      csx={{ size: 300, bg: '$secondary' }}
    >
      <Box
        csx={{
          ...palette('teal'),
          size: 100,
        }}
      >
        Box 1
      </Box>
      <Box
        csx={{
          ...palette('purple'),
          size: 100,
        }}
      >
        Box 2
      </Box>
    </Flex>
  )
}
