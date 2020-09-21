import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Card, CardProps } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Card',
  component: Card,
} as Meta

const Template: Story<CardProps> = (args) => (
  <Card {...args} sx={{ maxWidth: '30rem' }}>
    <Card.Header>Title</Card.Header>
    <Card.Body>
      <img
        width="100%"
        src="https://careers.vtex.com/assets/media/perspectives03.jpg"
        alt="VTEX Careers"
      />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in
      sem dignissim, tempor nisl eget, porttitor enim. Sed vel velit et ex
      scelerisque pharetra ac at enim. Suspendisse potenti. Ut sapien risus,
      posuere at pulvinar eget, pellentesque non quam. Vivamus.
    </Card.Body>
    <Card.Footer>
      <Button>Button</Button>
    </Card.Footer>
  </Card>
)

export const Playground = Template.bind({})
Playground.args = {
  noPadding: true,
}
