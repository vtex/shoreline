import React from 'react'
import { Meta } from '@storybook/react'

import { Columns } from '../Columns'
import { Card } from './index'
import { Heading } from '@vtex/admin-components'
import { Paragraph } from '@vtex/admin-components'

export default {
  title: 'admin-ui/Card',
  component: Card,
} as Meta

export const Example = () => {
  return (
    <Card csx={{ width: '1/2' }}>
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

export const WithColumns = () => {
  return (
    <Columns>
      <Columns.Item units={[12, 12, 8]}>
        <Card csx={{ height: 'full' }}>
          <Heading>Build for community</Heading>
          <Paragraph>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </Paragraph>
        </Card>
      </Columns.Item>
      <Columns.Item units={[12, 12, 4]}>
        <Card>
          <Heading>Build for community</Heading>
          <Paragraph>
            It’s all about being ready to grow and reach new levels. Have a
            solid foundation, modular thinking and flexible essence, and you’re
            building for scale. We are global but we’re audacious enough to aim
            for the stars.
          </Paragraph>
        </Card>
      </Columns.Item>
    </Columns>
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
