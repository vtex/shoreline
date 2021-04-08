import React, { forwardRef, Ref, useEffect, useState } from 'react'
import { Box, NumericStepper, NumericStepperProps } from '@vtex/admin-ui'
import { useField } from 'formik'
import { handleErrorMessage } from '../util'

export const FormikNumericStepper = forwardRef(
  (props: FormikNumericStepperProps, ref: Ref<HTMLDivElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      onChange,
      formatMessage,
      ...partialNumericStepperProps
    } = props

    const [field, meta, helpers] = useField<number>({ name })
    const [value, setValue] = useState<number>(field.value)

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorMessage,
      formatMessage
    )

    // useEffects to maintain consistency between state and value in formik
    useEffect(() => {
      if (value !== field.value) {
        setValue(field.value)
      }
    }, [field.value]) // When forms is reset or the field is changed outside

    const handleChange = (event: { value: number }) => {
      onChange && onChange(event)
      helpers.setValue(event.value)
      setValue(event.value)
    }

    return (
      <Box onClick={() => helpers.setTouched(true)}>
        <NumericStepper
          id={id}
          value={value}
          onChange={handleChange}
          error={!!errorMessage}
          errorMessage={errorMessage ?? undefined}
          {...partialNumericStepperProps}
          ref={ref}
        />
      </Box>
    )
  }
)

export interface FormikNumericStepperProps
  extends Omit<NumericStepperProps, 'id' | 'onChange' | 'value'> {
  name: string
  id?: string
  onChange?: (value: { value: number }) => void
  formatMessage?: (errorCode: string) => string
}
