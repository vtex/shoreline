import React, { forwardRef, Ref } from 'react'
import { Input, InputProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { handleErrorMessage } from '../util'

export const FormikInput = forwardRef(
  (props: FormikInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      ...inputProps
    } = props

    const [field, meta] = useField({ name })

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorMessage,
      formatMessage
    )

    return (
      <Input
        id={id}
        error={!!errorMessage}
        errorMessage={errorMessage ?? undefined}
        {...field}
        {...inputProps}
        ref={ref}
      />
    )
  }
)

export interface FormikInputProps extends Omit<InputProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}
