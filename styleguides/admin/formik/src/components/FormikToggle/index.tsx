import React, { forwardRef, ReactNode, Ref } from 'react'
import {
  Label,
  Set,
  Text,
  Toggle,
  ToggleProps,
  useToggleState,
} from '@vtex/admin-ui'
import { useField } from 'formik'
import { handleErrorMessage, useSyncedState } from '../util'

export const FormikToggle = forwardRef(
  (props: FormikToggleProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      id = name,
      label,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      onChange,
      ...toggleProps
    } = props

    const [field, meta, helpers] = useField({ name })
    const toggleState = useToggleState({ state: meta.initialValue })

    useSyncedState(
      toggleState.state,
      toggleState.setState,
      field.value,
      helpers.setValue,
      onChange
    )

    const errorMessage = handleErrorMessage(
      meta,
      currentError,
      currentErrorMessage,
      formatMessage
    )

    return (
      <Set orientation="vertical" spacing={1}>
        <Set spacing={2}>
          <Toggle
            id={id}
            state={toggleState}
            {...toggleProps}
            ref={ref}
            onBlur={() => helpers.setTouched(true)}
          />
          {label && <Label htmlFor={id}>{label}</Label>}
        </Set>
        {errorMessage && (
          <Text variant="small" feedback="danger">
            {errorMessage}
          </Text>
        )}
      </Set>
    )
  }
)

export interface FormikToggleProps
  extends Omit<ToggleProps, 'state' | 'checked' | 'value'> {
  name: string
  label?: string | ReactNode
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
