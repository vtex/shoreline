import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Input, InputType, InputProps } from './index'
import { Box } from '../Box'

export default {
  title: 'forms/Input',
  component: Input,
} as Meta

export const Playground: Story<InputProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box styles={{ width: 300 }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </Box>
  )
}

Playground.args = {
  id: 'Input',
  label: 'Label',
  helperText: 'Helper Text!',
  errorMessage: 'Error Message!',
  charLimit: 120,
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
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
    <Box styles={{ width: 300 }}>
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

export const Types = () => {
  const [value, setValue] = useState('')
  const types = ['text', 'email', 'url', 'tel'] as InputType[]

  return (
    <Box styles={{ width: 300 }}>
      {types.map((type) => (
        <Input
          type={type}
          key={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={type}
          label={type}
        />
      ))}
    </Box>
  )
}
