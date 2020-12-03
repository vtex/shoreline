import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { IconLock } from '@vtex/admin-ui-icons'

import { InputPassword } from './index'
import { Box } from '../Box'

export default {
  title: 'forms/input-password',
} as Meta

export const Example = () => {
  const [value, setValue] = useState('')

  return (
    <Box styles={{ width:300 }}>
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
    <Box styles={{ width:300 }}>
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
