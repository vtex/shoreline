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

export const WithoutPadding = () => {
  return (
    <Card sx={{ padding: 0, width: '40%' }}>
      <Text variant="headline" sx={{ padding: 13 }} color="text">
        Our People
      </Text>
      <img
        width="100%"
        src="https://careers.vtex.com/assets/media/perspectives03.jpg"
        alt=""
      />
      <Text as="p" variant="body" sx={{ padding: 13 }} color="text">
        At VTEX we believe inclusion inspires innovation. We are committed to
        implement a recruiting process that guarantees equal opportunities for
        all, regardless of ethnicity, gender, disability, sexual orientation,
        gender identity or religion.
      </Text>
    </Card>
  )
}
