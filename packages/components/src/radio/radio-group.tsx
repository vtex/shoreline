import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { RadioStore } from '@ariakit/react'
import {
  RadioGroup as BaseRadioGroup,
  RadioProvider,
  useRadioStore,
} from '@ariakit/react'
import { Field, FieldDescription, FieldError } from '../field'
import { Stack } from '../stack'
import { useId } from '@vtex/shoreline-utils'
import './radio-group.css'
import { Label } from '../label'

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  function Radio(props, ref) {
    const {
      error,
      description,
      errorText,
      label,
      children,
      className,
      horizontal = false,
      state,
      id: defaultId,
      ...otherProps
    } = props

    const id = useId(defaultId)

    return (
      <RadioProvider store={state}>
        <Field
          space="large"
          data-sl-radio-group
          error={error}
          className={className}
        >
          <Label htmlFor={id}>{label}</Label>
          <BaseRadioGroup data-sl-group id={id} ref={ref} {...otherProps}>
            <Stack
              horizontal={horizontal}
              space={horizontal ? '$space-5' : '$space-4'}
            >
              {children}
            </Stack>
          </BaseRadioGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError>{errorText}</FieldError>
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
  error?: boolean
  description?: string
  errorText?: string
  label: ReactNode
  horizontal?: boolean
  state?: RadioStore
}

export const useRadioState: (props?: RadioGroupState) => RadioStore =
  useRadioStore
