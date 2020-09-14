import React from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../Button'
import { Flex } from './index'

export default {
  title: 'beta/Flex',
  component: Flex,
} as Meta

export const Playground = () => {
  return (
    <Flex
      width="full"
      height="21"
      justify="evenly"
      padding="10"
      sx={{ backgroundColor: 'muted.3' }}
    >
      <Flex width="1/5" height="full" sx={{ backgroundColor: 'muted.2' }}>
        {(props) => <Button {...props}>My Button</Button>}
      </Flex>
      <Flex width="1/5" height="full" sx={{ backgroundColor: 'muted.2' }} />
      <Flex width="1/5" height="full" sx={{ backgroundColor: 'muted.2' }} />
    </Flex>
  )
}
