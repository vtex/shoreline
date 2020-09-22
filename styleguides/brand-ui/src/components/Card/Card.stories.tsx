import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box, Flex } from 'theme-ui'

import { Card, CardProps } from './index'
import { Button } from '../Button'

export default {
  title: 'beta/Card',
  component: Card,
} as Meta

const Template: Story<CardProps> = (args) => <Card {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.',
  noPadding: false,
  sx: { maxWidth: '40rem' },
}

export const Variations = () => (
  <>
    <Card size="small" sx={{ maxWidth: '20rem' }}>
      <Card.Header sx={{ marginBottom: 4 }}>Small card</Card.Header>
      <Card.Body>
        <Box>Lorem ipsum dolor sit amet, consect adipiscing elit.</Box>
      </Card.Body>
    </Card>
    <Card size="regular" sx={{ maxWidth: '42rem', marginTop: 6 }}>
      <Card.Header sx={{ marginBottom: 4 }}>Regular card</Card.Header>
      <Card.Body>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Box>
      </Card.Body>
    </Card>
    <Card size="regular" sx={{ maxWidth: '42rem', marginTop: 6 }}>
      <Card.Header sx={{ marginBottom: 4 }}>Card with button</Card.Header>
      <Card.Body>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Box>
      </Card.Body>
      <Card.Footer
        sx={{ marginTop: 4, width: '100%', justifyContent: 'flex-end' }}
      >
        <Button size="small">Primary</Button>
      </Card.Footer>
    </Card>
    <Card size="small" noPadding sx={{ maxWidth: '42rem', marginTop: 6 }}>
      <Card.Header sx={{ paddingX: 5, paddingY: 6 }}>
        Card with image
      </Card.Header>
      <Card.Body>
        <img
          width="100%"
          src="https://careers.vtex.com/assets/media/perspectives03.jpg"
          alt="VTEX Careers"
        />
        <Box sx={{ paddingX: 5, paddingY: 6 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Box>
      </Card.Body>
    </Card>
  </>
)
