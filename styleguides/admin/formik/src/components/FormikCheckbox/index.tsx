import React, { ReactNode } from 'react'
import {
  Checkbox,
  CheckboxProps,
  Label,
  Set,
  Text,
  useCheckboxState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage, useSyncedState } from '../util'

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
    error: currentError, 
    errorMessage: currentErrorMessage, 
    formatMessage,
    ...checkboxProps
  } = props

  const [field, meta, helpers] = useField({ name })
  const checkboxState = useCheckboxState({ state: meta.initialValue })

  useSyncedState(checkboxState.state,checkboxState.setState,field.value,helpers.setValue)

  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  return (
    <Set orientation="vertical" spacing={0} >
      <Set spacing={2} >
        <div onClick={()=>helpers.setTouched(true)}>
          <Checkbox id={name} state={checkboxState} {...checkboxProps} />
        </div>
        {label && typeof label === "string" ? <Label>{label}</Label> : label}
      </Set>
      { 
        errorMessage && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 1, marginLeft: 1}}>
          {errorMessage}
        </Text>
      )}
    </Set>
  )
}
