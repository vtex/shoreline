import React from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../Button'
import { Box } from './index'

export default {
  title: 'beta/Box',
  component: Box,
} as Meta

export const Playground = () => {
  return (
    <Box
      display="flex"
      el="section"
      w="full"
      h="20"
      justify="evenly"
      p="10"
      bg="muted.4"
    >
      <Box w="1/5" h="full" bg="muted.2">
        {(props) => <Button {...props}>My Button</Button>}
      </Box>
      <Box w="1/5" h="full" bg="muted.2" />
      <Box w="1/5" h="full" c="text" justify="center" items="center">
        Text
      </Box>
    </Box>
  )
}
