import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import { TextField } from './index'
import { useInputState } from '../unstableInput'
import { IconBook } from '../../icons'
import { Box } from '../Box'

export default {
  title: 'system-next/text-field',
} as Meta

export const Example = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <TextField
        state={{
          value,
          onChange: (e) => setValue(e.target.value),
          onClear: () => setValue(''),
        }}
        id="textfield-1"
        label="Label"
        helperText="Helper Text"
        charLimit={120}
      />
    </Box>
  )
}

export const UsingInputHook = () => {
  const input = useInputState()

  return (
    <Box width={300}>
      <TextField
        state={input}
        id="textfield-2"
        label="Label"
        helperText="Helper Text"
        charLimit={120}
        suffix="Kg"
        icon={<IconBook />}
      />
    </Box>
  )
}

export const Basic = () => {
  const input = useInputState()

  return (
    <Box width={300}>
      <TextField
        state={input}
        id="textfield-3"
        label="Label"
        helperText="Helper Text"
        charLimit={120}
      />
    </Box>
  )
}

export const Error = () => {
  const input = useInputState()

  return (
    <Box width={300}>
      <TextField
        state={input}
        id="textfield-4"
        label="Label"
        errorMessage="Error Message"
        charLimit={120}
        suffix="Kg"
        icon={<IconBook />}
      />
    </Box>
  )
}
