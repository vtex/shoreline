import React, { useState } from 'react'
import type { Meta, Story } from '@storybook/react'

import { Box } from '../Box'
import type { TextAreaProps } from './index'
import { TextArea } from './index'

export default {
  title: 'admin-ui/TextArea',
  component: TextArea,
} as Meta

export const Playground: Story<TextAreaProps> = (args) => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  )
}

Playground.args = {
  id: 'TextArea',
  label: 'Label',
  helperText: 'Helper Text!',
  criticalText: 'Error Message!',
  charLimit: 120,
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textarea-1"
        label="Basic"
        helperText="Helper Text"
        charLimit={120}
      />
    </Box>
  )
}

export const Error = () => {
  const [value, setValue] = useState('Invalid Value')
  const [error, setError] = useState(true)

  const handleError = (currentValue: string) => {
    if (currentValue === 'Invalid Value') {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => {
          const newValue = e.target.value

          setValue(newValue)
          handleError(newValue)
        }}
        tone={error ? 'critical' : 'neutral'}
        id="textarea-2"
        label="Critical"
        helperText="Helper Text"
        criticalText="Critical Message"
        charLimit={120}
      />
    </Box>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('')

  return (
    <Box csx={{ width: 300 }}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="textarea-3"
        label="Disabled"
        helperText="Helper Text"
        disabled
        charLimit={120}
      />
    </Box>
  )
}
