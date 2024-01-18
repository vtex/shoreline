import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { RadioStore } from '@ariakit/react'
import {
  RadioGroup as BaseRadioGroup,
  RadioProvider,
  useRadioStore,
} from '@ariakit/react'
import { useId } from '@vtex/shoreline-utils'

import { Field, FieldDescription, FieldError } from '../field'
import { Stack } from '../stack'
import { Label } from '../label'

/**
 * Radio groups allow users to select one option from a list.
 * @example
 * <RadioGroup label="Radio group">
 *  <Radio value="1">Option 1</Radio>
 *  <Radio value="2">Option 2</Radio>
 *  <Radio value="3">Option 3</Radio>
 * </RadioGroup>
 */
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
  /**
   * The value of the active radio
   */
  value?: string | number | null
  /**
   * The callback to set the active radio
   */
  setValue?: ((value: string | number | null) => void) | undefined
  /**
   * The id of the active radio group item
   */
  activeId?: string | null
  /**
   * Default active id of the radio group
   */
  defaultActiveId?: string | null
  /**
   * Default value of the radio group
   */
  defaultValue?: string | number | null
}

export interface RadioGroupProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Whether the radio group is in an error state
   */
  error?: boolean
  /**
   * Radio group description
   */
  description?: string
  /**
   * Radio group error message
   */
  errorText?: string
  /**
   * Radio group label
   */
  label: ReactNode
  /**
   * Whether the radio group is horizontal or vertical
   * @default false
   */
  horizontal?: boolean
  /**
   * Radio group state
   */
  state?: RadioStore
}

export const useRadioState: (props?: RadioGroupState) => RadioStore =
  useRadioStore
