import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
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
}

export const FormikCheckboxGroup = ({ name, children,  ...props }: FormikCheckboxGroupProps) => {
  const { formatMessage } = useIntl()
  const [field, meta, helpers] = useField({ name })
  const checkboxState = useCheckboxState({ state: meta.initialValue })

  // useEffects to maintain consistency between checkbox state and value in formik
  useEffect(() => {
    checkboxState.setState(meta.initialValue)
  }, [meta.initialValue]) // When initial value is changed

  useEffect(() => {
    checkboxState.setState(field.value)
  }, [field.value]) // When forms is reset

  useEffect(() => {
    helpers.setValue(checkboxState.state)
    helpers.setTouched(true)
  }, [checkboxState.state]) // When the user changes the value

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const errorMessage = Array.isArray(errorCode) 
    ? errorCode.filter(x => x !== (null || undefined) )
      .map((value) => { 
        return value && formatMessage({ id: value })
      }).join(', ')
    : errorCode && formatMessage({ id: errorCode })

  return (
    <Box styles={{ marginBottom: 6 }}>
      <CheckboxGroup styleOverrides={{ marginBottom: 0 }} {...props} >
        <FormikCheckboxGroupContext.Provider value={checkboxState}>
          {children}
        </FormikCheckboxGroupContext.Provider>
      </CheckboxGroup>
      {errorMessage && (
        <Text variant="small" feedback="danger" styleOverrides={{paddingTop: 2}}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}

FormikCheckboxGroup.Item = FormikCheckbox

