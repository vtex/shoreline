import React, { forwardRef, Ref } from 'react'
import { Input, InputProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export interface FormikInputProps extends Omit<InputProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}

export const FormikInput = forwardRef(( props : FormikInputProps, ref: Ref<HTMLInputElement>) => {
  const {
    name,
    error: currentError, 
    errorMessage: currentErrorMessage, 
    id,
    formatMessage,
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

  return <Input {...inputProps} ref={ref}/>
})
