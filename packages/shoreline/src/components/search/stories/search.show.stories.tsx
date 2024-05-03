import React from 'react'

import { Search } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/search',
}

export function Show() {
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
      <Search disabled />
      <Search loading value={value} onChange={handleChange} onClear={onClear} />
      <Search disabled loading value="Search query" onClear={() => null} />
      <Search value="Search query" />
    </Stack>
  )
}
