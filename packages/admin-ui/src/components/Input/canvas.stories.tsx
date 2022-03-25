import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { IconPlus } from '@vtex/phosphor-icons'

import { Box } from '../Box'
import type { InputType, InputProps } from './index'
import { Input } from './index'
import { Anchor } from '../Anchor'

export default {
  title: 'admin-ui/Input',
  component: Input,
} as Meta

export const Playground: Story<InputProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
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
  criticalText: 'Error Message!',
  charLimit: 120,
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
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
    <Box csx={{ width: 300 }}>
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

export const HelperTextWithAnchor = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        helperText={['Helper Text with ', <Anchor>link</Anchor>]}
      />
    </Box>
  )
}

export const CharLimit = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
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
    <Box csx={{ width: 300 }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        icon={<IconPlus />}
      />
    </Box>
  )
}

export const FullBlown = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        id="textfield"
        label="Label"
        helperText="Helper Text"
        suffix="Kg"
        icon={<IconPlus />}
        charLimit={120}
      />
    </Box>
  )
}

export const Error = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textfield"
        label="Label"
        criticalText="Error Message"
        tone="critical"
      />
    </Box>
  )
}

export const Types = () => {
  const [value, setValue] = useState('')
  const types = ['text', 'email', 'url', 'tel'] as InputType[]

  return (
    <Box csx={{ width: 300 }}>
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
