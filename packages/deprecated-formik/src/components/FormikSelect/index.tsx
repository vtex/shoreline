import React from 'react'
import { useField } from 'formik'

import type { SelectProps } from '../DeprecatedBase'
import { Select } from '../DeprecatedBase'
import { handleErrorMessage } from '../util'

export function FormikSelect(props: FormikSelectProps) {
  const {
    name,
    error: currentError,
    errorMessage: currentErrorMessage,
    formatMessage,
    onChange,
    ...selectProps
  } = props

  const [field, meta, helpers] = useField({ name })

  const errorMessage = handleErrorMessage(
    meta,
    currentError,
    currentErrorMessage,
    formatMessage
  )

  return (
    <div onClick={() => helpers.setTouched(true)}>
      <Select
        name={name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        tone={errorMessage ? 'critical' : 'neutral'}
        criticalText={errorMessage ?? undefined}
        {...selectProps}
      />
    </div>
  )
}

export interface FormikSelectProps
  extends Omit<SelectProps, 'criticalText' | 'tone'> {
  name: string
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
