import React, { useEffect } from 'react'
import {
  Box,
  RadioGroup,
  RadioGroupProps,
  Text,
  useRadioState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { FormikRadioGroupContext } from './FormikRadioGroupContext'

export interface FormikRadioGroupProps extends Omit<RadioGroupProps,'state'> {
  name: string
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikRadioGroup = ({ name, children, error, errorMessage, formatMessage, ...props }: FormikRadioGroupProps) => {
  const [field, meta, helpers] = useField({ name })
  const radioState = useRadioState({ state: meta.initialValue })

  // useEffects to maintain consistency between checkbox state and value in formik
  useEffect(() => {
    radioState.setState(meta.initialValue)
  }, [meta.initialValue]) // When initial value is changed

  useEffect(() => {
    radioState.setState(field.value)
  }, [field.value]) // When forms is reset

  useEffect(() => {
    helpers.setValue(radioState.state)
    helpers.setTouched(true)
  }, [radioState.state]) // When the user changes the value

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
      <RadioGroup state={radioState} csx={{ marginBottom: 1 }} {...props}>
        <FormikRadioGroupContext.Provider value={radioState}>
          {children}
        </FormikRadioGroupContext.Provider>
      </RadioGroup>
      {finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 2}}>
          {finalErrorMessage}
        </Text>
      )}
    </Box>
  )
}
