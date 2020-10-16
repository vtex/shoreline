import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableInput as Input } from './index'
import { unstableThemeProvider as ThemeProvider } from '../../unstableSystem'
import { unstableTheme } from '../../unstableTheme'

export default {
  title: 'system-next/input',
} as Meta

export const Base: Story = () => {
  return (
    <ThemeProvider theme={unstableTheme}>
      <Input aria-label="Label" />
    </ThemeProvider>
  )
}
