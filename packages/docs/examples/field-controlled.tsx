import { useState } from 'react'
import {
  Field,
  FieldError,
  FieldDescription,
  Input,
  Label,
} from '@vtex/shoreline'

export default function Example() {
  const [value, setValue] = useState('Initial value')
  const [error, setError] = useState<string | null>(null)

  return (
    <Field error={!!error}>
      <Label>Controlled input field</Label>
      <Input
        value={value}
        onChange={(val) => {
          if (val === 'error') {
            setError("Please use a value that isn't 'error'")
            setValue(val)
            return
          }

          setError(null)
          setValue(val)
        }}
      />
      <FieldDescription>Value shouldn't be "error"</FieldDescription>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
