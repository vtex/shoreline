import React, { useEffect, useState } from 'react'
import { Box, NumericStepper, NumericStepperProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { useErrorMessage } from '../util'

export interface FormikNumericStepperProps extends Omit<NumericStepperProps, 'id'|'onChange'|'value'> {
  name: string
  id?: string
  onChange?: (value: {value: number}) => void
  formatMessage?: (errorCode: string) => string
}

export const FormikNumericStepper = ( props : FormikNumericStepperProps) => {
  const {
    name,
    error: currentError, 
    errorMessage: currentErrorMessage, 
    id,
    onChange,
    formatMessage,
    ...partialNumericStepperProps
  } = props

  const [field, meta, helpers] = useField<number>({ name })
  const [value, setValue] = useState<number>(field.value)

  const errorMessage = useErrorMessage(currentError,currentErrorMessage,meta,formatMessage)

  // useEffects to maintain consistency between state and value in formik
  useEffect(() => {
    if (value !== field.value) {
      setValue(field.value)
    }
  }, [field.value]) // When forms is reset or the field is changed outside

  const numericStepperProps = {
    onChange: (event : {value: number}) => {
      onChange && onChange(event)
      helpers.setValue(event.value)
      setValue(event.value)
    },
    id: id ?? name,
    errorMessage: errorMessage ? errorMessage : undefined,
    error: !!errorMessage,
    ...partialNumericStepperProps,
  }

  return (
    <Box onClick={()=>helpers.setTouched(true)}>
      <NumericStepper value={value} {...numericStepperProps} />
    </Box>
  )
}

