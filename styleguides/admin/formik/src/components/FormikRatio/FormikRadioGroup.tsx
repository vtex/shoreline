import React, { useEffect } from 'react'
import {
  Box,
  RadioGroup,
  RadioGroupProps,
  Text,
  useRadioState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { FormikRadioGroupContext } from './context'

export interface FormikRadioGroupProps extends Omit<RadioGroupProps,'state'> {
  name: string
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikRadioGroup = ( props : FormikRadioGroupProps) => {
  const { 
    name, 
    children, 
    error, 
    errorMessage, 
    formatMessage, 
    ...radioGroupProps 
  } = props

  const [field, meta, helpers] = useField({ name })
  const radioState = useRadioState({ state: meta.initialValue })

  // useEffects to maintain consistency between checkbox state and value in formik
  useEffect(() => {
    if (radioState.state !== field.value) {
      radioState.setState(field.value)
    }
  }, [field.value]) // When forms is reset or the field is changed outside

  useEffect(() => {
    helpers.setValue(radioState.state)
  }, [radioState.state])  // When the user changes the value by the component

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
      <RadioGroup state={radioState} csx={{ marginBottom: 0 }} {...radioGroupProps}>
        <FormikRadioGroupContext.Provider value={{state: radioState, setTouched: helpers.setTouched}}>
          {children}
        </FormikRadioGroupContext.Provider>
      </RadioGroup>
      {finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 1}}>
          {finalErrorMessage}
        </Text>
      )}
    </Box>
  )
}
