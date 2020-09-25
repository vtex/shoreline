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
    <Card w="1/2">
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
    <Card p="0" w="2/5">
      <Text variant="headline" p="13">
        Our People
      </Text>
      <img
        width="100%"
        src="https://careers.vtex.com/assets/media/perspectives03.jpg"
        alt=""
      />
      <Text el="p" variant="body" p="13">
        At VTEX we believe inclusion inspires innovation. We are committed to
        implement a recruiting process that guarantees equal opportunities for
        all, regardless of ethnicity, gender, disability, sexual orientation,
        gender identity or religion.
      </Text>
    </Card>
  )
}
