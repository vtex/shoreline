import React from 'react'
import { useIntl } from 'react-intl'
import { Input, InputProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikInputProps extends Omit<InputProps, 'id'> {
  name: string
  id?: string
}

export const FormikInput = ({
  name,
  error,
  errorMessage,
  id,
  ...props
}: FormikInputProps) => {
  const { formatMessage } = useIntl()

  const [field, meta] = useField({ name })

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
    ? formatMessage({ id: errorCode })
    : undefined

  const inputProps = {
    ...field,
    ...props,
    id: id ?? name,
    errorMessage: finalErrorMessage,
    error: finalError,
  }

  return <Input {...inputProps} />
}

