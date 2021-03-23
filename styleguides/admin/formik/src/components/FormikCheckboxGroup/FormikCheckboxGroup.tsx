import React, { useEffect } from 'react'
import {
  Box,
  CheckboxGroup,
  CheckboxGroupProps,
  Text,
  useCheckboxState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { FormikCheckboxGroupContext } from './FormikCheckboxGroupContext'
import { FormikCheckbox } from './FormikCheckbox'

export interface FormikCheckboxGroupProps extends Omit<CheckboxGroupProps,'state'> {
  name: string
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikCheckboxGroup = ({ name, children, error, errorMessage, formatMessage, ...props }: FormikCheckboxGroupProps) => {
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
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : Array.isArray(errorCode) 
      ? errorCode.filter(x => x !== (null || undefined) )
        .map((value) => { 
          return value 
            && formatMessage 
              ? formatMessage(value)
              : value
        }).join(', ')
      : errorCode 
        && formatMessage 
          ? formatMessage(errorCode)
          : errorCode

  return (
    <Box csx={{ marginBottom: 6 }}>
      <CheckboxGroup csx={{ marginBottom: 0 }} {...props} >
        <FormikCheckboxGroupContext.Provider value={{state: checkboxState, setTouched: helpers.setTouched}}>
          {children}
        </FormikCheckboxGroupContext.Provider>
      </CheckboxGroup>
      {finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 1}}>
          {finalErrorMessage}
        </Text>
      )}
    </Box>
  )
}

FormikCheckboxGroup.Item = FormikCheckbox

