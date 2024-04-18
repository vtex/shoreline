import React from 'react'
import { Radio, RadioGroup } from '@vtex/shoreline'

export default function Example() {
  return (
    <RadioGroup label="Radio group">
      <Radio value="1">Option 1</Radio>
      <Radio value="2">Option 2</Radio>
      <Radio value="3">Option 3</Radio>
    </RadioGroup>
  )
}
