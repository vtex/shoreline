import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Tooltip, TooltipProps } from '.'
import { Button } from '../Button'

export default {
  title: 'beta/Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = (args) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: '5%',
      }}
    >
      <Tooltip {...args}>
        <Button>Children component</Button>
      </Tooltip>
    </div>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  label: 'Label',
  placement: 'top',
}
