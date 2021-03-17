import React, { ReactNode, useEffect } from 'react'
import { useIntl } from 'react-intl'
import {
  Checkbox,
  CheckboxProps,
  Label,
  Set,
  Text,
  useCheckboxState,
} from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikCheckboxProps extends CheckboxProps {
  name: string
  label?: string | ReactNode
  error?: boolean;
  errorMessage?: string;
}

export const FormikCheckbox = ({ name, label, error, errorMessage, ...props }: FormikCheckboxProps) => {
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
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
    ? formatMessage({ id: errorCode })
    : undefined

  return (
    <Set orientation="vertical" >
      <Set spacing={3} styleOverrides={{ marginY: 1 }}>
        <Checkbox id={name} state={checkboxState} {...props} />
        {label && typeof label === "string" ? <Label>{label}</Label> : label}
      </Set>
      { 
        finalError && (
        <Text variant="small" feedback="danger" styleOverrides={{paddingTop: 2}}>
          {finalErrorMessage}
        </Text>
      )}
    </Set>
  )
}
