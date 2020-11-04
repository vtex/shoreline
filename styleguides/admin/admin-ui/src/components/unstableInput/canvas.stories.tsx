import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableInput as Input, useInputState } from './index'
import { IconBook } from '../../icons'
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
        icon={<IconBook />}
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
        icon={<IconBook />}
        styleOverrides={{ borderColor: 'text' }}
      />
    </Box>
  )
}
