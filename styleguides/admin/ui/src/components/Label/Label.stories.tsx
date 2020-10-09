import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Label, LabelProps } from './index'
import { Box } from '../Box'

export default {
  title: 'beta/Label',
  component: Label,
} as Meta

export const Basic: Story<LabelProps> = () => {
  return (
    <Label display="flex">
      <input type="checkbox" />
      Checkbox Input Label!
    </Label>
  )
}

export const HtmlFor: Story<LabelProps> = () => {
  return (
    <Box display="flex" direction="col" w={160}>
      <Label htmlFor="text-id">Text Input Label!</Label>
      <input type="text" id="text-id" />
    </Box>
  )
}
