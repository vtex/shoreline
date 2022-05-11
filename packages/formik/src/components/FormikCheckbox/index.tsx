import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CheckboxProps } from '@vtex/admin-ui'
import { Checkbox, Set, useCheckboxState } from '@vtex/admin-ui'
import { useField } from 'formik'

import { handleErrorMessage, useSyncedState } from '../util'

export const FormikCheckbox = forwardRef(
  (props: FormikCheckboxProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorText: currentErrorText,
      formatMessage,
      onChange,
      ...checkboxProps
    } = props

    const [field, meta, helpers] = useField({ name })
    const checkboxState = useCheckboxState({ initialValue: meta.initialValue })

    useSyncedState(
      checkboxState.value,
      checkboxState.setValue,
      field.value,
      helpers.setValue,
      onChange
    )

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorText,
      formatMessage
    )

    const hasError = currentError ?? !!errorMessage

    return (
      <Set orientation="vertical" spacing={1}>
        <Set spacing={2}>
          <Checkbox
            id={id}
            state={checkboxState}
            error={hasError}
            errorText={errorMessage}
            {...checkboxProps}
            ref={ref}
            onBlur={() => helpers.setTouched(true)}
          />
        </Set>
      </Set>
    )
  }
)

export interface FormikCheckboxProps
  extends Omit<CheckboxProps, 'state' | 'checked' | 'value' | 'onChange'> {
  name: string
  label: string | ReactNode
  error?: boolean
  errorText?: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: boolean | 'indeterminate') => void
}
