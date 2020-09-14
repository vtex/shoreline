import React from 'react'
import { Meta } from '@storybook/react'

import { Flex } from './index'

export default {
  title: 'beta/Flex',
  component: Flex,
} as Meta

export const Playground = () => {
  return (
    <Flex
      items="center"
      self="stretch"
      order={1}
      justify="evenly"
      sx={{ width: '', height: '13' }}
    >
      <Flex
        sx={{ width: '15', height: 'full', backgroundColor: 'primary.base' }}
      />
      <Flex
        sx={{ width: '15', height: 'full', backgroundColor: 'danger.base' }}
      />
    </Flex>
  )
}
