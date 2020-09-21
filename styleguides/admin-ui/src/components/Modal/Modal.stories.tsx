import React from 'react'
import { Meta } from '@storybook/react'

import { Modal } from './index'
import { Text } from '../Text'

export default {
  title: 'alpha/Modal',
  component: Modal,
} as Meta

export const Example = () => {
  return (
    <Modal disclosure={<button>Open</button>}>
      <Text variant="headline">Build for community</Text>
      <Text>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Text>
    </Modal>
  )
}
