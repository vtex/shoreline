import type { Ref } from 'react'
import React, { forwardRef, useEffect, useState } from 'react'
import { useField } from 'formik'
import { Box } from '@vtex/admin-ui'

import type { NumericStepperProps } from '../DeprecatedBase'
import { NumericStepper } from '../DeprecatedBase'

import { handleErrorMessage } from '../util'

/**
 * @deprecated Use @vtex/admin-ui-form instead
 * @see https://admin-ui.vercel.app/next/guidelines/components/form
 */
export const FormikNumericStepper = forwardRef(
  (props: FormikNumericStepperProps, ref: Ref<HTMLDivElement>) => {
    const {
      name,
      id = name,
      error: currentError,
      errorMessage: currentErrorMessage,
      onChange,
      formatMessage,
      ...numericStepperProps
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
      onChange?.(event)
      helpers.setValue(event.value)
      setValue(event.value)
    }

    return (
      <Box onClick={() => helpers.setTouched(true)}>
        <NumericStepper
          id={id}
          value={value}
          onChange={handleChange}
          tone={errorMessage ? 'critical' : 'neutral'}
          criticalText={errorMessage ?? undefined}
          {...numericStepperProps}
          ref={ref}
        />
      </Box>
    )
  }
)

export interface FormikNumericStepperProps
  extends Omit<
    NumericStepperProps,
    'id' | 'onChange' | 'value' | 'criticalText' | 'tone'
  > {
  name: string
  id?: string
  onChange?: (value: { value: number }) => void
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
