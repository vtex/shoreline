import React from 'react'
import { useIntl } from 'react-intl'
import { InputPassword, InputPasswordProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikInputPasswordProps extends Omit<InputPasswordProps, 'id'> {
  name: string
  id?: string
}

export const FormikInputPassword = ({
  name,
  error,
  errorMessage,
  id,
  ...props
}: FormikInputPasswordProps) => {
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

  return <InputPassword {...inputProps} />
}