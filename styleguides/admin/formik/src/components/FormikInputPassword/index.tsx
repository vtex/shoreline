import React, { forwardRef, Ref } from 'react'
import { InputPassword, InputPasswordProps } from '@vtex/admin-ui'
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
      <InputPassword
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

export interface FormikInputPasswordProps
  extends Omit<InputPasswordProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}
