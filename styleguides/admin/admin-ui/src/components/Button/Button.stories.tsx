import React from 'react'
import { darken } from '@theme-ui/color'
import { Story, Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { Button } from './index'
import { IconAppStore } from '../../icons'
import { unstableSet as Set } from '../unstableSet'

export default {
  title: 'beta/button',
} as Meta

export const StyleOverrides: Story = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export const Palette: Story = () => {
  return (
    <ThemeProvider>
      <Set>
        <Button>Primary Button</Button>
        <Button palette="danger">Danger Button</Button>
      </Set>
    </ThemeProvider>
  )
}

export const Size: Story = () => {
  return (
    <ThemeProvider>
      <Set>
        <Button>Regular Button</Button>
        <Button size="small">Small Button</Button>
      </Set>
    </ThemeProvider>
  )
}

export const Variant: Story = () => {
  return (
    <ThemeProvider>
      <Set>
        <Button variant="filled">Filled Button</Button>
        <Button variant="subtle">Subtle Button</Button>
        <Button variant="text">Text Button</Button>
      </Set>
    </ThemeProvider>
  )
}

export const WithIcon: Story = () => {
  return (
    <ThemeProvider>
      <Set>
        <Button icon={<IconAppStore />} variant="filled">
          Icon Start
        </Button>
        <Button icon={<IconAppStore />} iconPosition="end" variant="subtle">
          IconEnd
        </Button>
        <Button icon={<IconAppStore title="Icon only" />} variant="text" />
      </Set>
    </ThemeProvider>
  )
}
