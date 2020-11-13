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
        bg: 'text.primary',
        ':hover': {
          bg: darken('text.primary', 0.05),
        },
        ':active': {
          bg: darken('text.primary', 0.1),
        },
      }}
    >
      Trust Button
    </Button>
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
    <Set
      styleOverrides={{
        flexWrap: 'wrap',
      }}
    >
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="tertiary">Tertiary Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="danger-secondary">Danger Secondary Button</Button>
      <Button variant="danger-tertiary">Danger Tertiary Button</Button>
      <Button variant="text">Text Button</Button>
    </Set>
  )
}

export const WithIcon: Story = () => {
  return (
    <Set>
      <Button icon={<IconAppStore />}>Icon Start</Button>
      <Button icon={<IconAppStore />} iconPosition="end" variant="secondary">
        IconEnd
      </Button>
      <Button icon={<IconAppStore title="Icon only" />} variant="tertiary" />
    </Set>
  )
}
