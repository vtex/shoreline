/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { useToolbarState, Toolbar, ToolbarItem } from 'reakit/Toolbar'

import { Button, ButtonProps } from './index'
import { IconCancel } from '../../icons'

export default {
  title: 'beta/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Playground = Template.bind({})
Playground.args = {
  children: 'Admin UI Button',
}

export const WithIconOnly = Template.bind({})

WithIconOnly.args = {
  icon: (props: any) => <IconCancel title="Icon title" {...props} />,
}

export const WithIconStart = Template.bind({})
WithIconStart.args = {
  icon: (props: any) => <IconCancel {...props} />,
  children: 'Admin UI Button',
}

export const WithIconEnd = Template.bind({})
WithIconEnd.args = {
  icon: (props: any) => <IconCancel {...props} />,
  iconPosition: 'end',
  children: 'Admin UI Button',
}

export const WithinAToolbar = () => {
  const toolbar = useToolbarState({ loop: true })

  return (
    <Toolbar {...toolbar} aria-label="Sample toolbar">
      <ToolbarItem {...toolbar}>
        {(props) => (
          <Button {...props} variant="filled" palette="danger">
            Delete
          </Button>
        )}
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
