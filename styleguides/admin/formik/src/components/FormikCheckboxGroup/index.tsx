import React, { useEffect } from 'react'
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
import { useErrorMessage } from '../util'

export interface FormikCheckboxGroupProps extends Omit<CheckboxGroupProps,'state'> {
  name: string
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikCheckboxGroup = ( props : FormikCheckboxGroupProps) => {
  const {
    name, 
    children, 
    error: currentError, 
    errorMessage: currentErrorMessage, 
    formatMessage,
    ...checkboxGroupProps
  } = props
  
  const [field, meta, helpers] = useField({ name })
  const checkboxState = useCheckboxState({ state: meta.initialValue })

  // useEffects to maintain consistency between checkbox state and value in formik
  useEffect(() => {
    if (checkboxState.state !== field.value) {
      checkboxState.setState(field.value)
    }
  }, [field.value]) // When forms is reset or the field is changed outside

  useEffect(() => {
    helpers.setValue(checkboxState.state)
  }, [checkboxState.state])  // When the user changes the value by the component

  // Verify if there is any error and show message
  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  return (
    <Box csx={{ marginBottom: 6 }}>
      <CheckboxGroup csx={{ marginBottom: 0 }} {...checkboxGroupProps} >
        <FormikCheckboxGroupContext.Provider value={{state: checkboxState, setTouched: helpers.setTouched}}>
          {children}
        </FormikCheckboxGroupContext.Provider>
      </CheckboxGroup>
      {errorMessage && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 1}}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}

FormikCheckboxGroup.Item = FormikCheckbox

