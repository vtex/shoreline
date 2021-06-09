import React from 'react'
import {
  Box,
  CheckboxGroup,
  CheckboxGroupProps,
  Text,
  useCheckboxState,
} from '@vtex/admin-ui'
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
    errorMessage: currentErrorMessage,
    formatMessage,
    onChange,
    ...checkboxGroupProps
  } = props

  const [field, meta, helpers] = useField({ name })
  const checkboxState = useCheckboxState({ state: meta.initialValue })

  useSyncedState(
    checkboxState.state,
    checkboxState.setState,
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
      <CheckboxGroup csx={{ marginBottom: 0 }} {...checkboxGroupProps} id={id}>
        <FormikCheckboxGroupContext.Provider
          value={{ state: checkboxState, setTouched: helpers.setTouched }}
        >
          {children}
        </FormikCheckboxGroupContext.Provider>
      </CheckboxGroup>
      {errorMessage && (
        <Text variant="small" feedback="danger" csx={{ paddingTop: 1 }}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}

FormikCheckboxGroup.Item = FormikCheckbox

export interface FormikCheckboxGroupProps
  extends Omit<CheckboxGroupProps, 'state'> {
  name: string
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: string[] | number[]) => void
}
