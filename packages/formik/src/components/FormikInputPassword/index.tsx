import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { InputPasswordProps } from '@vtex/admin-ui'
import { InputPassword } from '@vtex/admin-ui'
import { useField } from 'formik'

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
        error={!!errorMessage}
        errorMessage={errorMessage ?? undefined}
        {...field}
        onChange={handleChange}
        {...inputProps}
        ref={ref}
      />
    )
  }
)

export interface FormikInputPasswordProps
  extends Omit<InputPasswordProps, 'id' | 'value'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}
