import React from 'react'
import { Meta } from '@storybook/react'

import { Card } from './index'
import { Text } from '../Text'

export default {
  title: 'beta/Card',
  component: Card,
} as Meta

export const Example = () => {
  return (
    <Card sx={{ width: '50%' }}>
      <Text variant="headline">Build for community</Text>
      <Text>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Text>
    </Card>
  )
}
