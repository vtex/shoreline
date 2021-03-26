import React, { ReactNode } from 'react'
import { Label, Set, Text, Toggle, ToggleProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikToggleProps extends ToggleProps {
  name: string,
  label?: string | ReactNode
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikToggle = ( props : FormikToggleProps) => {
  const { 
    name, 
    label, 
    error, 
    errorMessage, 
    formatMessage, 
    onChange, 
    id, 
    ...toggleProps 
  } = props

  const [field, meta, helpers] = useField({ name })

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
    <Set orientation="vertical" spacing={0}>
      <Set spacing={2} >
        <div onClick={()=>helpers.setTouched(true)}>
          <Toggle
            id={id ? id : name}
            checked={field.value}
            onChange={(e: any) => {
              field.onChange(e)
              onChange && onChange(e)
            }}
            {...toggleProps}
          />
        </div>
        {label && typeof label === "string" ? <Label>{label}</Label> : label}
      </Set>
      { 
        finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: '0.063rem', marginLeft: 1}}>
          {finalErrorMessage}
        </Text>
      )}
    </Set>
    
  )
}
