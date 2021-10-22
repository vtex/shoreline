import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { TextAreaProps } from '@vtex/admin-ui'
import { TextArea } from '@vtex/admin-ui'
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
      ...textAreaProps
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
        tone={errorMessage ? 'critical' : 'neutral'}
        criticalText={errorMessage ?? undefined}
        {...textAreaProps}
        ref={ref}
      />
    )
  }
)

export interface FormikTextAreaProps
  extends Omit<
    TextAreaProps,
    'id' | 'value' | 'onChange' | 'criticalText' | 'tone'
  > {
  name: string
  id?: string
  errorMessage?: string
  error?: boolean
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  formatMessage?: (errorCode: string) => string
}
