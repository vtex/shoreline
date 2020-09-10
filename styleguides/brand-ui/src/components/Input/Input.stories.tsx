import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box } from 'theme-ui'

import Input, { InputProps } from './index'

export default {
  title: 'Work in progress/Input',
  component: Input,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['regular', 'large'],
      },
    },
  },
} as Meta

const Template: Story<InputProps> = (args: InputProps) => {
  return (
    <Box sx={{ backgroundColor: 'white', p: 10 }}>
      <p>Basic</p>
      <Input {...args} />
      <p>Suffix</p>
      <Input {...args} suffix={<div>😄</div>} />
      <p>Prefix</p>
      <Input {...args} prefix={<div>😄</div>} />
      <p>Suffix and prefix</p>
      <Input {...args} prefix={<div>😄</div>} suffix={<div>😄</div>} />
    </Box>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  size: 'regular',
  label: 'Sweet tea in the summer',
  helpMessage: 'Gimmie love',
  focus: true,
}
