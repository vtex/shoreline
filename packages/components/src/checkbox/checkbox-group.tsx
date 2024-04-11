import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Field, FieldDescription, FieldError } from '../field'
import { Stack } from '../stack'
import { useId } from '@vtex/shoreline-utils'
import { Label } from '../label'

/**
 * Checkbox groups allow users to select multiple options from a list.
 *
 * @example
 * <CheckboxGroup label="Checkbox group">
 *  <Checkbox value="1">Option 1</Checkbox>
 *  <Checkbox value="2">Option 2</Checkbox>
 * </CheckboxGroup>
 */
export const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  function CheckboxGroup(props, ref) {
    const {
      error,
      description,
      errorText,
      label,
      children,
      className,
      horizontal = false,
      id: defaultId,
      ...otherProps
    } = props

    const id = useId(defaultId)

    return (
      <Field
        data-sl-checkbox-group
        className={className}
        ref={ref}
        error={error}
        space="large"
        {...otherProps}
      >
        <Label htmlFor={id}>{label}</Label>
        <Stack
          horizontal={horizontal}
          space={horizontal ? '$space-5' : '$space-4'}
        >
          {children}
        </Stack>
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldError>{errorText}</FieldError>
      </Field>
    )
  }
)

export interface CheckboxGroupOptions extends ComponentPropsWithoutRef<'div'> {
  /**
   * Whether the checkbox group is in an error state
   */
  error?: boolean
  /**
   * Checkbox group description
   */
  description?: ReactNode
  /**
   * Checkbox group error message
   */
  errorText?: ReactNode
  /**
   * Checkbox group label
   */
  label: ReactNode
  /**
   * Whether the checkbox group is horizontal or vertical
   * @default false
   */
  horizontal?: boolean
}

export type CheckboxGroupProps = CheckboxGroupOptions &
  ComponentPropsWithoutRef<'div'>
