import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
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
}

export const FormikRadioGroup = ({ name, children, ...props }: FormikRadioGroupProps) => {
  const { formatMessage } = useIntl()
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
  const errorMessage = errorCode && formatMessage({ id: errorCode })

  return (
    <Box csx={{ marginBottom: 6 }}>
      <RadioGroup state={radioState} csx={{ marginBottom: 1 }} {...props}>
        <FormikRadioGroupContext.Provider value={radioState}>
          {children}
        </FormikRadioGroupContext.Provider>
      </RadioGroup>
      {errorMessage && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 2}}>
          {errorMessage}
        </Text>
      )}
    </Box>
  )
}
