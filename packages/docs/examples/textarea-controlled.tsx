import { useState } from 'react'
import { Textarea } from '@vtex/shoreline'

export default function Example() {
  const [value, setValue] = useState('Default text')

  return (
    <Textarea
      className="textarea-container"
      value={value}
      onChange={setValue}
      maxLength={120}
    />
  )
}
