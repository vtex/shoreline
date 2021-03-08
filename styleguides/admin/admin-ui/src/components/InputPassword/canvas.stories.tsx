import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { IconLock } from '@vtex/admin-ui-icons'

import { InputPassword, InputPasswordProps } from './index'
import { Box } from '../Box'

export default {
  title: 'admin-ui/InputPassword',
  component: InputPassword,
} as Meta

export const Playground: Story<InputPasswordProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box styles={{ width: 300 }}>
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
  errorMessage: 'Error Message!',
}

export const Example = () => {
  const [value, setValue] = useState('')

  return (
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
      <InputPassword
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textfield"
        label="Password"
        helperText="Use a strong password"
        errorMessage="The passwords do not match"
        charLimit={10}
        icon={<IconLock />}
        error
      />
    </Box>
  )
}
