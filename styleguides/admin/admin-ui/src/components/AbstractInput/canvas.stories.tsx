import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { IconAdd, IconLock } from '@vtex/admin-ui-icons'

import { AbstractInput, AbstractInputPassword } from './index'
import { Box } from '../Box'

export default {
  title: 'forms/abstract-input',
} as Meta

export const Text: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <AbstractInput
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="username"
        suffix="kg"
        icon={<IconAdd />}
      />
    </Box>
  )
}

export const Error: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <AbstractInput
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="with error"
        error
      />
    </Box>
  )
}

export const Password: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <AbstractInputPassword
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="password"
        icon={<IconLock />}
      />
    </Box>
  )
}

export const OverrideStyles: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <AbstractInput
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="username"
        suffix="kg"
        icon={<IconAdd />}
        styleOverrides={{ borderColor: 'text.primary' }}
      />
    </Box>
  )
}
