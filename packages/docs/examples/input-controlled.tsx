import { useState } from 'react'
import { Input } from '@vtex/shoreline'

export default function Example() {
  const [value, setValue] = useState('Initial value')

  return (
    <div>
      <Input value={value} onChange={setValue} />
      <p>The input's value is: {value}</p>
    </div>
  )
}
