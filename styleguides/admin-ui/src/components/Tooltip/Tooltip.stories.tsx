import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from './index'
import { Button } from '../Button'
import { IconAddChannel } from '../../icons'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <Button icon={<IconAddChannel />} variant="text" />
  </Tooltip>
)

export const Usage = Template.bind({})
Usage.args = {
  placement: 'right',
  label: 'Add new channel',
}
