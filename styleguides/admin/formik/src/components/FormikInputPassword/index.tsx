import React, { forwardRef, Ref } from 'react'
import { InputPassword, InputPasswordProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export const FormikInputPassword = forwardRef(
  (props: FormikInputPasswordProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      ...partialInputProps
    } = props

    const [field, meta] = useField({ name })

    const errorMessage = useErrorMessage(
      currentError,
      currentErrorMessage,
      meta,
      formatMessage
    )

    const inputProps = {
      ...field,
      ...partialInputProps,
      id,
      errorMessage: errorMessage ? errorMessage : undefined,
      error: !!errorMessage,
    }

    return <InputPassword {...inputProps} ref={ref} />
  }
)

export interface FormikInputPasswordProps
  extends Omit<InputPasswordProps, 'id'> {
  name: string
  id?: string
  formatMessage?: (errorCode: string) => string
}
