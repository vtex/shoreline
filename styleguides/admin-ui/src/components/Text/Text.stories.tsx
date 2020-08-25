import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box } from 'theme-ui'

import { Text, TextProps, getTextSx } from './index'

export default {
  title: 'beta/Text',
  component: Text,
} as Meta

const Template: Story<TextProps> = (args) => <Text {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Admin UI Text',
}

export const As = () => (
  <ol>
    <Text variant="headline" as="li">
      Headline
    </Text>
    <Text variant="subtitle" as="li">
      Subtitle
    </Text>
  </ol>
)

export const FontSx = () => (
  <Box
    sx={{
      ...getTextSx('highlight'),
      width: '30%',
      textAlign: 'justify',
    }}
  >
    “All parts should go together without forcing. You must remember that the
    parts you are reassembling were disassembled by you. Therefore, if you can’t
    get them together again, there must be a reason. By all means, do not use a
    hammer.” —{' '}
    <Text variant="small" as="span">
      IBM Manual, 1925
    </Text>
  </Box>
)
