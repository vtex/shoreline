import type { InputHTMLAttributes } from 'react'
import React from 'react'

import { useDateMask } from './use-input-mask'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  const { getInputProps } = useDateMask()

  return <input {...getInputProps(props)} />
}
