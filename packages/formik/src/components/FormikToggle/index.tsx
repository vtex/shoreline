import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { SwitchProps } from '@vtex/admin-ui'
import { Set, Text, Switch, useSwitchState } from '@vtex/admin-ui'
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
    const toggleState = useSwitchState({ state: meta.initialValue })

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
          <Switch
            id={id}
            state={toggleState}
            label={label}
            {...toggleProps}
            ref={ref}
            onBlur={() => helpers.setTouched(true)}
          />
        </Set>
        {errorMessage && (
          <Text variant="detail" tone="critical">
            {errorMessage}
          </Text>
        )}
      </Set>
    )
  }
)

export interface FormikToggleProps
  extends Omit<
    SwitchProps,
    'state' | 'checked' | 'value' | 'onChange' | 'label'
  > {
  name: string
  label?: string | ReactNode
  error?: boolean
  errorMessage?: string
  formatMessage?: (errorCode: string) => string
  onChange?: (value: boolean) => void
}
