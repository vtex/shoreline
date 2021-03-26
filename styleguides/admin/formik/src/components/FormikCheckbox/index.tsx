import React, { ReactNode, useEffect } from 'react'
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
  formatMessage?: (errorCode: string) => string
}

export const FormikCheckbox = ( props : FormikCheckboxProps) => {
  const {
    name, 
    label, 
    error, 
    errorMessage, 
    formatMessage,
    ...checkboxProps
  } = props

  const [field, meta, helpers] = useField({ name })
  const checkboxState = useCheckboxState({ state: meta.initialValue })

  // useEffects to maintain consistency between checkbox state and value in formik
  useEffect(() => {
    checkboxState.setState(field.value)
  }, [field.value]) // When forms is reset or the field is changed outside

  useEffect(() => {
    helpers.setValue(checkboxState.state)
  }, [checkboxState.state]) // When the user changes the value by the component

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
      ? formatMessage 
        ? formatMessage(errorCode)
        : errorCode
      : undefined

  return (
    <Set orientation="vertical" spacing={0} >
      <Set spacing={2} >
        <div onClick={()=>helpers.setTouched(true)}>
          <Checkbox id={name} state={checkboxState} {...checkboxProps} />
        </div>
        {label && typeof label === "string" ? <Label>{label}</Label> : label}
      </Set>
      { 
        finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 1, marginLeft: 1}}>
          {finalErrorMessage}
        </Text>
      )}
    </Set>
  )
}
