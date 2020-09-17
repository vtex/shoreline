import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from '.'
import { Button } from '../Button'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: <Button>Teste</Button>,
  label: 'Label',
}
