import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label, LabelProps } from './index'
import { Box } from '../Box'

export default {
  title: 'forms/Label',
  component: Label,
} as Meta

export const Playground: Story<LabelProps> = (args) => {
  return (
    <Label {...args}>
      <input type="checkbox" />
      Checkbox Input Label!
    </Label>
  )
}

Playground.args = { styleOverrides: { display: 'flex' } }

export const HtmlFor = () => {
  return (
    <Box styles={{ display: 'flex', flexDirection: 'column', width: 160 }}>
      <Label htmlFor="text-id">Text Input Label!</Label>
      <input type="text" id="text-id" />
    </Box>
  )
}
