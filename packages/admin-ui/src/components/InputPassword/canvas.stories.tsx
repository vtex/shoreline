import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { IconLock } from '@vtex/phosphor-icons'

import { Box } from '../Box'
import type { InputPasswordProps } from './index'
import { InputPassword } from './index'

export default {
  title: 'admin-ui/InputPassword',
  component: InputPassword,
} as Meta

export const Playground: Story<InputPasswordProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <InputPassword
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  )
}

Playground.args = {
  id: 'InputPassword',
  label: 'Label',
  helperText: 'Helper Text!',
  criticalText: 'Error Message!',
}

export const Example = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <InputPassword
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textfield"
        label="Password"
        helperText="Use a strong password"
        charLimit={10}
      />
    </Box>
  )
}

export const Error = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <InputPassword
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textfield"
        label="Password"
        helperText="Use a strong password"
        criticalText="The passwords do not match"
        charLimit={10}
        icon={<IconLock />}
        tone="critical"
      />
    </Box>
  )
}
