import React, { useEffect, useState } from 'react'
import { Box, NumericStepper, NumericStepperProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikNumericStepperProps extends Omit<NumericStepperProps, 'id'|'onChange'|'value'> {
  name: string
  id?: string
  onChange?: (value: {value: number}) => void
  formatMessage?: (errorCode: string) => string
}

export const FormikNumericStepper = ({
  name,
  error,
  errorMessage,
  id,
  onChange,
  formatMessage,
  ...props
}: FormikNumericStepperProps) => {

  const [field, meta, helpers] = useField<number>({ name })
  const [value, setValue] = useState<number>(field.value)

  // useEffects to maintain consistency between state and value in formik
  useEffect(() => {
    if (value !== field.value) {
      setValue(field.value)
    }
  }, [field.value]) // When forms is reset or the field is changed outside

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


  
  const inputProps = {
    onChange: (event : {value: number}) => {
      onChange && onChange(event)
      helpers.setValue(event.value)
      setValue(event.value)
    },
    id: id ?? name,
    errorMessage: finalErrorMessage && finalErrorMessage,
    error: finalError===true ? finalError : undefined,
    ...props,
  }

  return (
    <Box onClick={()=>helpers.setTouched(true)}>
      <NumericStepper value={value} {...inputProps} />
    </Box>
  )
}

