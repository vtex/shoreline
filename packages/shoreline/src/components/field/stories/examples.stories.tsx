import { useState } from 'react'
import { Field } from '..'
import { Label } from '../../label'
import { Input } from '../../input'

export default {
  title: 'components/field',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Controlled() {
  const [value, setValue] = useState('default value')

  return (
    <Field>
      <Label>Label</Label>
      <Input value={value} onChange={setValue} />
      <div>value: {value}</div>
    </Field>
  )
}
