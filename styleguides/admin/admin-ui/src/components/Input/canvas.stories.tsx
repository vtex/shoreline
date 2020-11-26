import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Input } from './index'
import { Box } from '../Box'

export default {
  title: 'forms/input',
} as Meta

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="simple-input"
        label="Label"
      />
    </Box>
  )
}

export const HelperText = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        helperText="Helper Text"
      />
    </Box>
  )
}

export const CharLimit = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        charLimit={120}
      />
    </Box>
  )
}

export const WithIcon = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        icon={<IconAdd />}
      />
    </Box>
  )
}

export const FullBlown = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        helperText="Helper Text"
        suffix="Kg"
        icon={<IconAdd />}
        charLimit={120}
      />
    </Box>
  )
}

export const Error = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textfield"
        label="Label"
        errorMessage="Error Message"
        error
      />
    </Box>
  )
}
