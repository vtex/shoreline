import '../../../dist/styles.min.css'
import '../search.css'

import React from 'react'

import { Search } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/search',
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
}

export function Default() {
  const [value, setValue] = React.useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setValue('')
  }

  return (
    <Stack>
      <Search value={value} onChange={handleChange} onClear={onClear} />
    </Stack>
  )
}

export function Playground(props) {
  return (
    <Stack>
      <Search {...props} />
    </Stack>
  )
}

export function All() {
  const [value, setValue] = React.useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setValue('')
  }

  return (
    <Stack>
      <Search disabled />
      <Search loading value={value} onChange={handleChange} onClear={onClear} />
      <Search disabled loading value="Search query" onClear={() => null} />
      <Search value="Search query" />
    </Stack>
  )
}
