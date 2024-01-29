import React from 'react'

import { Search } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/search',
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
      default: 'Change me',
    },
    disabled: { control: 'boolean', default: false },
    loading: { control: 'boolean', default: false },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Play(props) {
  return (
    <Stack>
      <Search {...props} />
    </Stack>
  )
}
