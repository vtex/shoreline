import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Box } from '../Box'
import { Text, TextProps } from './index'

export default {
  title: 'beta/Text',
  component: Text,
} as Meta

const Template: Story<TextProps> = (args) => <Text {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Admin UI Text',
}

export const El = () => (
  <ol>
    <Text variant="headline" el="li">
      Headline
    </Text>
    <Text variant="subtitle" el="li">
      Subtitle
    </Text>
  </ol>
)

export const FontSx = () => (
  <Text
    variant="highlight"
    w="2/4"
    sx={{
      textAlign: 'justify',
    }}
  >
    “All parts should go together without forcing. You must remember that the
    parts you are reassembling were disassembled by you. Therefore, if you can’t
    get them together again, there must be a reason. By all means, do not use a
    hammer.” —{' '}
    <Text variant="small" el="span" fw="bold">
      IBM Manual, 1925
    </Text>
  </Text>
)

export const NativeElements = () => (
  <Box w={200}>
    <h1>Heading one</h1>
    <h2>Heading two</h2>
    <h3>Heading three</h3>
    <h4>Heading four</h4>
    <h5>Heading five</h5>
    <h6>Heading six</h6>
    <p>
      Expand your market reach and reduce overhead with an ecommerce
      marketplace.Leverage a collaborative commerce platform with native
      marketplace and distributed order management capabilities built-in for
      rapid time to revenue.
    </p>
  </Box>
)
export const Tokens = () => (
  <Box w={200}>
    <Box fw="light" fs="4">
      Light Text
    </Box>
    <Box fw="regular" fs="4">
      Regular Text
    </Box>
    <Box fw="medium" fs="4">
      Medium Text
    </Box>
    <Box fw="bold" fs="4">
      Bold Text
    </Box>
  </Box>
)

export const FontVariations = () => (
  <Box>
    <Text el="span" variant="small">
      Small
    </Text>
    <br />
    <Text el="span" variant="body">
      Body
    </Text>
    <br />
    <Text el="span" variant="highlight">
      Highlight
    </Text>
    <br />
    <Text el="span" variant="action">
      Action
    </Text>
    <br />
    <Text el="span" variant="subtitle">
      Subtitle
    </Text>
    <br />
    <Text el="span" variant="headline">
      Headline
    </Text>
  </Box>
)
