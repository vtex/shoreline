import React from 'react'
import { InputPassword, InputPasswordProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikInputPasswordProps extends Omit<InputPasswordProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}

export const FormikInputPassword = ( props : FormikInputPasswordProps) => {
  const {
    name,
    error,
    errorMessage,
    formatMessage,
    id,
    ...partialInputProps
  } = props
  
  const [field, meta] = useField({ name })

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
      ? formatMessage 
        ? formatMessage(errorCode)
        : errorCode
      : undefined

  const inputProps = {
    ...field,
    ...partialInputProps,
    id: id ?? name,
    errorMessage: finalErrorMessage,
    error: finalError,
  }

  return <InputPassword {...inputProps} />
}