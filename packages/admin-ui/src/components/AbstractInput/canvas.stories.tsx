import React, { useState } from 'react'
import type { Story, Meta } from '@storybook/react'
import { IconPlus, IconLock } from '@vtex/phosphor-icons'
import { Box } from '../Box'

import { AbstractInput, AbstractInputPassword } from './index'

export default {
  title: 'admin-ui/AbstractInput',
  component: AbstractInput,
} as Meta

export const Playground: Story = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <AbstractInput
        {...args}
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </Box>
  )
}

Playground.args = {
  id: 'AbstractInput',
  suffix: 'Kg',
  icon: <IconPlus />,
}

export const Error: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <AbstractInput
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="with error"
        tone="critical"
      />
    </Box>
  )
}

export const Password: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <AbstractInputPassword
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="password"
        icon={<IconLock />}
      />
    </Box>
  )
}

export const Overridecsx: Story = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <AbstractInput
        onClear={() => setValue('')}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        id="username"
        suffix="kg"
        icon={<IconPlus />}
        csx={{ border: '$positive' }}
      />
    </Box>
  )
}
