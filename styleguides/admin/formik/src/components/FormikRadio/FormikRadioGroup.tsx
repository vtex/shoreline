import React from 'react'
import {
  Box,
  RadioGroup,
  RadioGroupProps,
  Text,
  useRadioState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { FormikRadioGroupContext } from './context'
import { handleErrorMessage, useSyncedState } from '../util'

export const FormikRadioGroup = (props: FormikRadioGroupProps) => {
  const {
    name,
    id = name,
    children,
    error: currentError,
    errorMessage: currentErrorMessage,
    formatMessage,
    onChange,
    ...radioGroupProps
  } = props

  const [field, meta, helpers] = useField({ name })
  const radioState = useRadioState({ state: meta.initialValue })

  useSyncedState(
    radioState.state,
    radioState.setState,
    field.value,
    helpers.setValue,
    onChange
  )

  const errorMessage = handleErrorMessage(
    meta,
    currentError,
    currentErrorMessage,
    formatMessage
  )

  return (
    <Box csx={{ marginBottom: 6 }}>
      <RadioGroup
        state={radioState}
        csx={{ marginBottom: 0 }}
        id={id}
        {...radioGroupProps}
      >
        <FormikRadioGroupContext.Provider
          value={{ state: radioState, setTouched: helpers.setTouched }}
        >
          {children}
        </FormikRadioGroupContext.Provider>
      </RadioGroup>
      {errorMessage && (
        <Text variant="small" feedback="danger" csx={{ paddingTop: 1 }}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}

export interface FormikRadioGroupProps extends Omit<RadioGroupProps, 'state'> {
  name: string
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: string) => void
}
