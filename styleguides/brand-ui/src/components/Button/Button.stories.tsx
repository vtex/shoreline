import React from 'react'
import { Story, Meta } from '@storybook/react'
import { useToolbarState, Toolbar, ToolbarItem } from 'reakit/Toolbar'

import { Button, ButtonProps } from './index'

export default {
  title: 'brand/ready for beta/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Admin UI Button',
}

export const WithinAToolbar = () => {
  const toolbar = useToolbarState({ loop: true })

  return (
    <Toolbar {...toolbar} aria-label="Sample toolbar">
      <ToolbarItem {...toolbar}>
        {(props) => <Button {...props}>Delete</Button>}
      </ToolbarItem>
      <ToolbarItem {...toolbar}>
        {(props) => (
          <Button {...props} variant="outlined">
            File
          </Button>
        )}
      </ToolbarItem>
      <ToolbarItem {...toolbar}>
        {(props) => (
          <Button {...props} variant="subtle">
            Selection
          </Button>
        )}
      </ToolbarItem>
    </Toolbar>
  )
}
