import '../../../dist/styles.min.css'
import '../select.css'
import React, { useState } from 'react'

import { SelectProvider, Select, SelectOption, SelectPopover } from '../index'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/select',
}

export function Default() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select>Select: {value}</Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}

export function Composition() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select asChild>
        <Button>Select: {value}</Button>
      </Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}

export function Multiselect() {
  const [value, setValue] = useState([])

  return (
    <SelectProvider value={value} setValue={setValue}>
      <Select>Select: {value.length} Items</Select>
      <SelectPopover>
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="google">Google</SelectOption>
        <SelectOption value="microsoft">Microsoft</SelectOption>
        <SelectOption value="amazon">Amazon</SelectOption>
      </SelectPopover>
    </SelectProvider>
  )
}
