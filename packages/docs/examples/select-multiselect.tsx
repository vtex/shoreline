import { Select, SelectItem } from '@vtex/shoreline'
import { useState } from 'react'

export default function Example() {
  const [value, setValue] = useState<string | string[]>([])

  return (
    <Select value={value} setValue={setValue}>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Grape">Grape</SelectItem>
    </Select>
  )
}
