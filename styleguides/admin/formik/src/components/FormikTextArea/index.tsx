import React from 'react'
import { useIntl } from 'react-intl'
import { TextArea, TextAreaProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikTextAreaProps
  extends Omit<TextAreaProps, 'id' | 'value' | 'onChange'> {
  name: string
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const FormikTextArea = ({
  name,
  error,
  errorMessage,
  id,
  onChange,
  ...props
}: FormikTextAreaProps) => {
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
    onChange: onChange
      ? (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          field.onChange(event)
          onChange(event)
        }
      : field.onChange,
    ...props,
    id: id ?? name,
    errorMessage: finalErrorMessage,
    error: finalError,
  }

  return <TextArea {...inputProps} />
}
