import React from 'react'
import { Stack } from '../../stack'

import { Input } from '../index'

export default {
  title: 'components/input',
}

export function Show() {
  return (
    <Stack>
      <Input />
      <Input prefix="Prefix" suffix="Suffix" />
      <Input error />
    </Stack>
  )
}
