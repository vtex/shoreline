import React from 'react'
import { Story, Meta } from '@storybook/react'
import { IconAdd } from '@vtex/admin-ui-icons'

import { unstableInput as Input, useInputState } from './index'
import { Box } from '../Box'

export default {
  title: 'system-next/input',
} as Meta

export const Base: Story = () => {
  const { onClear, onChange, value } = useInputState()

  return (
    <Box width={300}>
      <Input
        onClear={onClear}
        onChange={onChange}
        value={value}
        id="username"
        suffix="kg"
        icon={<IconAdd />}
      />
    </Box>
  )
}

export const WithPassword: Story = () => {
  const { onClear, onChange, value } = useInputState()

  return (
    <Box width={300}>
      <Input
        type="password"
        onClear={onClear}
        onChange={onChange}
        value={value}
        id="password"
        icon={<IconAdd />}
      />
    </Box>
  )
}

export const OverrideStyles: Story = () => {
  const { onClear, onChange, value } = useInputState()

  return (
    <Box width={300}>
      <Input
        onClear={onClear}
        onChange={onChange}
        value={value}
        id="username"
        suffix="kg"
        icon={<IconAdd />}
        styleOverrides={{ borderColor: 'text.primary' }}
      />
    </Box>
  )
}
