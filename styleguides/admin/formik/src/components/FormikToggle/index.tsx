import React, { useEffect } from 'react'
import { Label, Set, Text, Toggle, ToggleProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useIntl } from 'react-intl'

export interface FormikToggleProps extends ToggleProps {
  name: string,
  label?: string
}

export const FormikToggle = ({ name, label, onChange, id, ...props }: FormikToggleProps) => {
  const [field, meta, helpers] = useField({ name })
  const { formatMessage } = useIntl()

  useEffect(()=>{
    helpers.setTouched(true)
  }, [field.value])

  useEffect(()=>{
    helpers.setTouched(false)
  }, [meta.initialValue])

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const errorMessage = errorCode && formatMessage({ id: errorCode })

  return (
    <Set orientation="vertical">
      <Set spacing={3} styleOverrides={{ marginY: 1 }}>
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
      { errorMessage && (
        <Text variant="small" feedback="danger" styleOverrides={{paddingTop: 1}}>
          {errorMessage}
        </Text>
      )}
    </Set>
    
  )
}
