import React from 'react'

import { Input } from '../index'

export default {
  title: 'components/input',
}

export function Default() {
  return <Input />
}

export function Slots() {
  return <Input prefix="Prefix" suffix="Suffix" />
}

export function Error() {
  return <Input error />
}

export function Controlled() {
  const [value, setValue] = React.useState('Default value')

  return (
    <div>
      <Input value={value} onChange={setValue} />
      <p>value: {value}</p>
    </div>
  )
}
