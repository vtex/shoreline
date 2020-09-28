import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Button } from '../Button'
import { Popover, PopoverProps } from './index'

export default {
  title: 'beta/Popover',
  component: Popover,
} as Meta

const Template: Story<PopoverProps> = ({ children, ...args }) => (
  <Popover
    {...args}
    disclosure={
      <Button size="small" sx={{ marginTop: 8, marginLeft: 10 }}>
        Click
      </Button>
    }
  >
    <Popover.Content>{children}</Popover.Content>
  </Popover>
)

export const SimpleUsage = Template.bind({})
SimpleUsage.args = {
  placement: 'top',
  variant: 'regular',
  children: 'Lorem ipsum dolor sit amet',
  visible: true,
  showClose: false,
}
