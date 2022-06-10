import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { useField } from 'formik'

import type { InputPasswordProps } from '../DeprecatedBase'
import { InputPassword } from '../DeprecatedBase'
import { handleErrorMessage } from '../util'

export const FormikInputPassword = forwardRef(
  (props: FormikInputPasswordProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      onChange,
      ...inputProps
    } = props

    const [field, meta] = useField({ name })

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorMessage,
      formatMessage
    )

    const handleChange =
      typeof onChange === 'function'
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(event)
            onChange(event)
          }
        : field.onChange

    return (
      <InputPassword
        id={id}
        tone={errorMessage ? 'critical' : 'neutral'}
        criticalText={errorMessage ?? undefined}
        {...field}
        onChange={handleChange}
        {...inputProps}
        ref={ref}
      />
    )
  }
)

export interface FormikInputPasswordProps
  extends Omit<InputPasswordProps, 'id' | 'value' | 'tone' | 'criticalText'> {
  name: string
  id?: string
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
