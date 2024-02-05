import React, { useState } from 'react'

import {
  SelectProvider,
  SelectTrigger,
  SelectItem,
  SelectPopover,
} from '../index'

export default {
  title: 'primitives/select',
}

export function Show() {
  const [value, setValue] = useState('')

  return (
    <SelectProvider value={value} setValue={setValue}>
      <SelectTrigger>Select: {value}</SelectTrigger>
      <SelectPopover>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="google">Google</SelectItem>
        <SelectItem value="microsoft">Microsoft</SelectItem>
        <SelectItem value="amazon">Amazon</SelectItem>
      </SelectPopover>
    </SelectProvider>
  )
}
