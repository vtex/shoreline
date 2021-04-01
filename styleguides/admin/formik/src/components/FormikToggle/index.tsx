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
import { useErrorMessage, useSyncedState } from '../util'

export const FormikToggle = forwardRef(
  (props: FormikToggleProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      label,
      error: currentError,
      errorMessage: currentErrorMessage,
      formatMessage,
      onChange,
      id,
      ...toggleProps
    } = props

    const [field, meta, helpers] = useField({ name })
    const toggleState = useToggleState({ state: meta.initialValue })

    useSyncedState(
      toggleState.state,
      toggleState.setState,
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
      <Set orientation="vertical" spacing={0}>
        <Set spacing={2}>
          <Toggle
            id={id ? id : name}
            state={toggleState}
            {...toggleProps}
            ref={ref}
            onBlur={() => helpers.setTouched(true)}
          />
          {label && typeof label === 'string' ? <Label>{label}</Label> : label}
        </Set>
        {errorMessage && (
          <Text
            variant="small"
            feedback="danger"
            csx={{ paddingTop: '0.063rem', marginLeft: 1 }}
          >
            {errorMessage}
          </Text>
        )}
      </Set>
    )
  }
)

export interface FormikToggleProps extends ToggleProps {
  name: string
  label?: string | ReactNode
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
}
