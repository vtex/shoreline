import React, { useState } from 'react'
import { Meta } from '@storybook/react'

import { TextArea } from './index'
import { Box } from '../Box'

export default {
  title: 'system-next/text-area',
} as Meta

export const Regular = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <TextArea
        state={{
          value,
          onChange: (e) => setValue(e.target.value),
        }}
        id="textarea-1"
        label="Label"
        helperText="Helper Text"
        charLimit={120}
      />
    </Box>
  )
}

export const Error = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <TextArea
        state={{
          value,
          onChange: (e) => setValue(e.target.value),
        }}
        id="textarea-2"
        label="Label"
        helperText="Helper Text"
        errorMessage="Error Message"
        charLimit={120}
      />
    </Box>
  )
}

export const Disabled = () => {
  const [value, setValue] = useState('')

  return (
    <Box width={300}>
      <TextArea
        state={{
          value,
          onChange: (e) => setValue(e.target.value),
        }}
        id="textarea-3"
        label="Label"
        helperText="Helper Text"
        disabled
        charLimit={120}
      />
    </Box>
  )
}
