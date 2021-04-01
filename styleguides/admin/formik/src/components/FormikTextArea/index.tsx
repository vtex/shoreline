import React, { forwardRef, Ref } from 'react'
import { TextArea, TextAreaProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export interface FormikTextAreaProps
  extends Omit<TextAreaProps, 'id' | 'value' | 'onChange'> {
  name: string
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  formatMessage?: (errorCode: string) => string
}

export const FormikTextArea = forwardRef(( props : FormikTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
  const {
    name,
    error: currentError, 
    errorMessage: currentErrorMessage, 
    formatMessage,
    id,
    onChange,
    ...patialTextAreaProps
  } = props

  const [field, meta] = useField({ name })

  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  const textAreaProps = {
    ...field,
    onChange: onChange
      ? (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          field.onChange(event)
          onChange(event)
        }
      : field.onChange,
    ...patialTextAreaProps,
    id: id ?? name,
    errorMessage: errorMessage ? errorMessage : undefined,
    error: !!errorMessage,
  }

  return <TextArea {...textAreaProps} ref={ref} />
})
