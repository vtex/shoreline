import React from 'react'
import type { CheckboxGroupProps } from '@vtex/admin-ui'
import { Box, CheckboxGroup, useCheckboxState } from '@vtex/admin-ui'
import { useField } from 'formik'

import { FormikCheckboxGroupContext } from './context'
import { FormikCheckbox } from './FormikCheckbox'
import { handleErrorMessage, useSyncedState } from '../util'

export const FormikCheckboxGroup = (props: FormikCheckboxGroupProps) => {
  const {
    name,
    id = name,
    children,
    error: currentError,
    errorText: currentErrorText,
    formatMessage,
    onChange,
    ...checkboxGroupProps
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
    <Box csx={{ marginBottom: 6 }}>
      <CheckboxGroup
        csx={{ marginBottom: 0 }}
        error={hasError}
        errorText={errorMessage}
        {...checkboxGroupProps}
        id={id}
      >
        <FormikCheckboxGroupContext.Provider
          value={{ state: checkboxState, setTouched: helpers.setTouched }}
        >
          {children}
        </FormikCheckboxGroupContext.Provider>
      </CheckboxGroup>
    </Box>
  )
}

FormikCheckboxGroup.Item = FormikCheckbox

export interface FormikCheckboxGroupProps
  extends Omit<CheckboxGroupProps, 'state' | 'onChange' | 'errorText'> {
  name: string
  error?: boolean
  errorText?: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: string[] | number[]) => void
}
