import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import { Select, SelectInline } from './index'
import type { SelectInlineProps } from './select-inline'
import type { SelectProps } from './select'
import { Box } from '../box'

export default {
  title: 'admin-ui-review/select',
  component: Select,
} as Meta

export const SelectComponent: Story<SelectProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: '288px' }}>
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...args}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Box>
  )
}

SelectComponent.args = {
  placeholder: 'Select...',
  label: 'Label',
  optional: false,
  helpText: 'Help text',
  error: false,
  errorText: 'Error text',
  csx: {
    margin: '$l',
  },
  disabled: false,
}

export const SelectInlineComponent: Story<SelectInlineProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <SelectInline
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    >
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </SelectInline>
  )
}

SelectInlineComponent.args = {
  placeholder: 'Select...',
  label: 'Label',
  disabled: false,
  csx: { margin: '$l' },
}
