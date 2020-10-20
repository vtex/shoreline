import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'
import { unstableInput as Input } from './index'

export default {
  title: 'system-next/input',
} as Meta

export const Base: Story = () => {
  return (
    <ThemeProvider>
      <Input aria-label="Label" />
    </ThemeProvider>
  )
}
