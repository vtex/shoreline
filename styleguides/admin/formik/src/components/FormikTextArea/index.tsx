import React, { forwardRef, Ref } from 'react'
import { TextArea, TextAreaProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { handleErrorMessage } from '../util'

export const FormikTextArea = forwardRef(
  (props: FormikTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      onChange,
      ...patialTextAreaProps
    } = props

    const [field, meta] = useField({ name })

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorMessage,
      formatMessage
    )

    const handleChange = onChange
      ? (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          field.onChange(event)
          onChange(event)
        }
      : field.onChange

    return (
      <TextArea
        id={id}
        {...field}
        onChange={handleChange}
        error={!!errorMessage}
        errorMessage={errorMessage ?? undefined}
        {...patialTextAreaProps}
        ref={ref}
      />
    )
  }
)

export interface FormikTextAreaProps
  extends Omit<TextAreaProps, 'id' | 'value' | 'onChange'> {
  name: string
  id?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  formatMessage?: (errorCode: string) => string
}
