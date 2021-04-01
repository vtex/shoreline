import React, { forwardRef, ReactNode, Ref } from 'react'
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

export const FormikCheckbox = forwardRef(
  (props: FormikCheckboxProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      label,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      ...checkboxProps
    } = props

    const [field, meta, helpers] = useField({ name })
    const checkboxState = useCheckboxState({ state: meta.initialValue })

    useSyncedState(
      checkboxState.state,
      checkboxState.setState,
      field.value,
      helpers.setValue
    )

    const errorMessage = useErrorMessage(
      currentError,
      currentErrorMessage,
      meta,
      formatMessage
    )

    return (
      <Set orientation="vertical" spacing={1}>
        <Set spacing={2}>
          <Checkbox
            id={id}
            state={checkboxState}
            {...checkboxProps}
            ref={ref}
            onBlur={() => helpers.setTouched(true)}
          />
          <Label htmlFor={id}>{label}</Label>
        </Set>
        {errorMessage && (
          <Text variant="small" feedback="danger" csx={{ marginLeft: 1 }}>
            {errorMessage}
          </Text>
        )}
      </Set>
    )
  }
)

export interface FormikCheckboxProps extends CheckboxProps {
  name: string
  label: string | ReactNode
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
