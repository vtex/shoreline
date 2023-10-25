import '../../../dist/styles.min.css'

import React from 'react'

import { Search } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/search',
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

export function All() {
  const [value, setValue] = React.useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const onClear = () => {
    setValue('')
  }

  return (
    <Stack space="1rem">
      <Search disabled />
      <Search loading value={value} onChange={handleChange} onClear={onClear} />
      <Search disabled loading value={'Search query'} onClear={() => null} />
    </Stack>
  )
}
