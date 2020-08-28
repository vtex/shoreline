import React from 'react'
import { Story, Meta } from '@storybook/react'
import { useToolbarState, Toolbar, ToolbarItem } from 'reakit/Toolbar'

import { Button, ButtonProps } from './index'

export default {
  title: 'beta/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Brand UI Button',
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
          <Button {...props} variant="primary">
            File
          </Button>
        )}
      </ToolbarItem>
      <ToolbarItem {...toolbar}>
        {(props) => (
          <Button {...props} variant="secondary">
            Selection
          </Button>
        )}
      </ToolbarItem>
    </Toolbar>
  )
}
