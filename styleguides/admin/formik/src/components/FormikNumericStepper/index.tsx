import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Box, NumericStepper, NumericStepperProps } from '@vtex/admin-ui'
import { useField } from 'formik'

export interface FormikNumericStepperProps extends Omit<NumericStepperProps, 'id'|'onChange'|'value'> {
  name: string
  id?: string
  onChange?: (value: {value: number}) => void
}

export const FormikNumericStepper = ({
  name,
  error,
  errorMessage,
  id,
  onChange,
  ...props
}: FormikNumericStepperProps) => {
  const { formatMessage } = useIntl()

  const [field, meta, helpers] = useField<number>({ name })
  const [value, setValue] = useState<number>(field.value)


  // useEffects to maintain consistency between state and value in formik
  useEffect(() => {
    meta.initialValue && setValue(meta.initialValue)
  }, [meta.initialValue]) // When initial value is changed

  useEffect(() => {
    setValue(field.value)
  }, [field.value]) // When forms is reset

  // Verify if there is any error and show message
  const errorCode = meta.touched && meta.error
  const finalError = error ?? !!errorCode
  const finalErrorMessage = error
    ? errorMessage
    : errorCode
    ? formatMessage({ id: errorCode })
    : undefined


  
  const inputProps = {
    onChange: (event : {value: number}) => {
      helpers.setValue(event.value)
      helpers.setTouched(true)
      setValue(event.value)
      onChange && onChange(event)
    },
    id: id ?? name,
    errorMessage: finalErrorMessage && finalErrorMessage,
    error: finalError===true ? finalError : undefined,
    ...props,
  }

  return (
    <Box>
      <NumericStepper value={value} {...inputProps} />
    </Box>
  )
}

