import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box } from 'theme-ui'

import { IconMock } from '../Button/IconMock' // TODO Move to a utils?
import Input, { InputProps } from './index'

export default {
  title: 'Work in progress/Input',
  component: Input,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'regular', 'large'],
      },
    },
  },
} as Meta

const Template: Story<InputProps> = (args: InputProps) => {
  return (
    <Box sx={{ backgroundColor: 'white', p: 5 }}>
      <Input {...args} />
    </Box>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  label: 'Company name',
  helpMessage: 'I could go on and on and I will.',
  charLimit: 32,
}

export const Sizes = () => (
  <Box sx={{ backgroundColor: 'white', p: 5 }}>
    <Input size="small" label="Small" helpMessage="This is a small input." />
    <Input
      size="regular"
      label="Regular"
      helpMessage="This is a regular input."
    />
    <Input size="large" label="Large" helpMessage="This is a large input." />
  </Box>
)

export const Contents = () => (
  <Box sx={{ backgroundColor: 'white', p: 5 }}>
    <Input label="Text only" helpMessage="This is a basic input." />
    <Input
      label="Text + Suffix"
      helpMessage="This input has a suffix."
      suffix={<IconMock />}
    />
    <Input
      label="Text + Prefix"
      helpMessage="This input has a prefix."
      prefix={<IconMock />}
    />
  </Box>
)
