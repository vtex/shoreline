import React from 'react'
import type { TextInputProps as InputProps } from '@vtex/admin-ui'
import { TextInput as Input } from '@vtex/admin-ui'

import type { FormState, RegisterOptions } from '../form'

export function TextInput(props: TextInputProps) {
  const { state, name = '', validation, ...rest } = props

  const {
    register,
    formState: { errors },
  } = state

  const hasError = !!errors[name]
  const errorText = errors?.[name]?.message

  return (
    <Input
      error={hasError}
      errorText={errorText}
      {...register(name, validation)}
      {...rest}
    />
  )
}

interface TextInputProps
  extends Omit<InputProps, 'name' | 'error' | 'errorText' | 'required'> {
  name: string
  state: FormState
  validation?: RegisterOptions
}
