import React from 'react'
import { InputPassword, InputPasswordProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export interface FormikInputPasswordProps extends Omit<InputPasswordProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}

export const FormikInputPassword = ( props : FormikInputPasswordProps) => {
  const {
    name,
    error: currentError, 
    errorMessage: currentErrorMessage, 
    formatMessage,
    id,
    ...partialInputProps
  } = props
  
  const [field, meta] = useField({ name })

  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  const inputProps = {
    ...field,
    ...partialInputProps,
    id: id ?? name,
    errorMessage: errorMessage ? errorMessage : undefined,
    error: !!errorMessage,
  }

  return <InputPassword {...inputProps} />
}