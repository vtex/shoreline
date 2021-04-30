import React from 'react'
import { Meta } from '@storybook/react'

import { Card } from './index'
import { Heading, Paragraph } from '../../typography'

export default {
  title: 'data-display/Card',
  component: Card,
} as Meta

export const Example = () => {
  return (
    <Card csx={{ width: '50%' }}>
      <Heading>Build for community</Heading>
      <Paragraph>
        It’s all about being ready to grow and reach new levels. Have a solid
        foundation, modular thinking and flexible essence, and you’re building
        for scale. We are global but we’re audacious enough to aim for the
        stars.
      </Paragraph>
    </Card>
  )
}

export const WithoutPadding = () => {
  return (
    <Card csx={{ padding: 0, width: 500 }}>
      <Heading
        csx={{
          padding: 6,
        }}
      >
        Our People
      </Heading>
      <img
        width="100%"
        src="https://careers.vtex.com/assets/media/perspectives03.jpg"
        alt=""
      />
      <Paragraph
        csx={{
          padding: 6,
        }}
      >
        At VTEX we believe inclusion inspires innovation. We are committed to
        implement a recruiting process that guarantees equal opportunities for
        all, regardless of ethnicity, gender, disability, sexual orientation,
        gender identity or religion.
      </Paragraph>
    </Card>
  )
}
