import React from 'react'
import type { RadioGroupProps } from '@vtex/admin-ui'
import { Box, RadioGroup, useRadioState } from '@vtex/admin-ui'
import { useField } from 'formik'

import { FormikRadioGroupContext } from './context'
import { handleErrorMessage, useSyncedState } from '../util'

export const FormikRadioGroup = (props: FormikRadioGroupProps) => {
  const {
    name,
    id = name,
    children,
    error: currentError,
    errorText: currentErrorText,
    formatMessage,
    onChange,
    ...radioGroupProps
  } = props

  const [field, meta, helpers] = useField({ name })
  const radioState = useRadioState({ defaultValue: meta.initialValue })

  useSyncedState(
    radioState.value,
    radioState.setValue,
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
      <RadioGroup
        {...radioGroupProps}
        state={radioState}
        csx={{ marginBottom: 0 }}
        id={id}
        error={hasError}
        errorText={errorMessage}
      >
        <FormikRadioGroupContext.Provider
          value={{ setTouched: helpers.setTouched }}
        >
          {children}
        </FormikRadioGroupContext.Provider>
      </RadioGroup>
    </Box>
  )
}

export interface FormikRadioGroupProps
  extends Omit<RadioGroupProps, 'state' | 'onChange'> {
  name: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: string | number | undefined) => void
}
