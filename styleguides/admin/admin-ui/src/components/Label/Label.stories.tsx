import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label, LabelProps } from './index'
import { Box } from '../Box'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'beta/forms/label',
  component: Label,
} as Meta

export const Basic: Story<LabelProps> = () => {
  return (
    <ThemeProvider>
      <Label styleOverrides={{ display: 'flex' }}>
        <input type="checkbox" />
        Checkbox Input Label!
      </Label>
    </ThemeProvider>
  )
}

export const HtmlFor: Story<LabelProps> = () => {
  return (
    <ThemeProvider>
      <Box display="flex" direction="col" w={160}>
        <Label htmlFor="text-id">Text Input Label!</Label>
        <input type="text" id="text-id" />
      </Box>
    </ThemeProvider>
  )
}
