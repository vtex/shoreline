import React from 'react'
import { Meta } from '@storybook/react'

import { Box } from './index'
import { Button } from '../Button'

export default {
  title: 'alpha/Box',
  component: Box,
} as Meta

export function Basic() {
  return <Box>Im a div</Box>
}

export function StyleProps() {
  return (
    <Box
      display="flex"
      el="section"
      w="full"
      h="20"
      justify="evenly"
      p="5"
      bg="muted.4"
      items="center"
    >
      <Box
        display="flex"
        w="1/3"
        h="full"
        bg="muted.2"
        m="2"
        justify="center"
        items="center"
      >
        1/3
      </Box>
      <Box
        display="flex"
        w="1/3"
        h="full"
        bg="muted.2"
        m="2"
        justify="center"
        items="center"
      >
        1/3
      </Box>
      <Box
        display="flex"
        w="1/3"
        h="full"
        bg="muted.2"
        m="2"
        justify="center"
        items="center"
      >
        1/3
      </Box>
    </Box>
  )
}

export function CompositionWithRenderProps() {
  return (
    <Box w="2xl">
      {(props) => <Button {...props}>Button With 2xl Width</Button>}
    </Box>
  )
}

CompositionWithRenderProps.parameters = {
  playroom: {
    code: `
<Box w="2xl" h="full">
  {(props) => <Button {...props}>Button With 2xl Width</Button>}
</Box>
    `,
  },
}
