import React, { forwardRef, Ref } from 'react'
import { Input, InputProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export const FormikInput = forwardRef(
  (props: FormikInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      ...partialInputProps
    } = props

    const [field, meta] = useField({ name })

    const errorMessage = useErrorMessage(
      currentError,
      currentErrorMessage,
      meta,
      formatMessage
    )

    return (
      <Input
        id={id}
        error={!!errorMessage}
        errorMessage={errorMessage ?? undefined}
        {...field}
        {...partialInputProps}
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
