import React, { ReactNode, useEffect } from 'react'
import { Label, Set, Text, Toggle, ToggleProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikToggleProps extends ToggleProps {
  name: string,
  label?: string | ReactNode
  error?: boolean;
  errorMessage?: string;
  formatMessage?: (errorCode: string) => string
}

export const FormikToggle = ({ name, label, error, errorMessage, formatMessage, onChange, id, ...props }: FormikToggleProps) => {
  
  const [field, meta, helpers] = useField({ name })

  useEffect(()=>{
    helpers.setTouched(true)
  }, [field.value])

  useEffect(()=>{
    helpers.setTouched(false)
  }, [meta.initialValue])

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
    <Set orientation="vertical">
      <Set spacing={3} csx={{ marginY: 1 }}>
          <Toggle
          id={id ? id : name}
          checked={field.value}
          onChange={(e: any) => {
            field.onChange(e)
            helpers.setTouched(true)
            onChange && onChange(e)
          }}
          {...props}
        />
        {label && typeof label === "string" ? <Label>{label}</Label> : label}
      </Set>
      { 
        finalError && (
        <Text variant="small" feedback="danger" csx={{paddingTop: 2}}>
          {finalErrorMessage}
        </Text>
      )}
    </Set>
    
  )
}
