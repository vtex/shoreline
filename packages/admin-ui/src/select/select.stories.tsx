import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Select } from './index'

export default {
  title: 'admin-ui-review/select',
  component: Select,
} as Meta

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Select an option!"
      label="Label"
      helpText="Help text"
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </Select>
  )
}
