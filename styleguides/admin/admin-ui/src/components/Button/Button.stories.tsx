import React from 'react'
import { darken } from '@theme-ui/color'
import { Story, Meta } from '@storybook/react'

import { Button } from './index'
import { IconAppStore } from '../../icons'
import { Set } from '../Set'

export default {
  title: 'beta/button',
} as Meta

export const StyleOverrides: Story = () => {
  return (
    <Button
      styleOverrides={{
        bg: 'text',
        ':hover': {
          bg: darken('text', 0.05),
        },
        ':active': {
          bg: darken('text', 0.1),
        },
      }}
    >
      Trust Button
    </Button>
  )
}

export const Palette: Story = () => {
  return (
    <Set>
      <Button>Primary Button</Button>
      <Button palette="danger">Danger Button</Button>
    </Set>
  )
}

export const Size: Story = () => {
  return (
    <Set>
      <Button>Regular Button</Button>
      <Button size="small">Small Button</Button>
    </Set>
  )
}

export const Variant: Story = () => {
  return (
    <Set>
      <Button variant="filled">Filled Button</Button>
      <Button variant="subtle">Subtle Button</Button>
      <Button variant="text">Text Button</Button>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconAppStore />} variant="filled">
        Icon Start
      </Button>
      <Button icon={<IconAppStore />} iconPosition="end" variant="subtle">
        IconEnd
      </Button>
      <Button icon={<IconAppStore title="Icon only" />} variant="text" />
    </Set>
  )
}
