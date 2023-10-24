import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react'
import React, { forwardRef } from 'react'
import type { RadioStore } from '@ariakit/react'
import {
  RadioGroup as BaseRadioGroup,
  RadioProvider,
  useRadioStore,
} from '@ariakit/react'
import { Field, FieldLabel, FieldMessage } from '../field'
import { Stack } from '../stack'

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  function Radio(props, ref) {
    const {
      error,
      helpText,
      errorText,
      label,
      children,
      className,
      direction,
      state,
      ...otherProps
    } = props

    return (
      <RadioProvider store={state}>
        <Field data-sl-group-field className={className}>
          <FieldLabel>{label}</FieldLabel>
          <BaseRadioGroup data-sl-group ref={ref} {...otherProps}>
            <Stack direction={direction}>{children}</Stack>
          </BaseRadioGroup>
          <FieldMessage
            error={error}
            helpText={helpText}
            errorText={errorText}
          />
        </Field>
      </RadioProvider>
    )
  }
)

export interface RadioGroupState {
  value?: string | number | null
  setValue?: ((value: string | number | null) => void) | undefined
  activeId?: string | null
  defaultActiveId?: string | null
  defaultValue?: string | number | null
}

export interface RadioGroupProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  error?: boolean
  helpText?: string
  errorText?: string
  label: string
  direction?: 'row' | 'column'
  state?: RadioStore
}

export const useRadioState: (props?: RadioGroupState) => RadioStore =
  useRadioStore
