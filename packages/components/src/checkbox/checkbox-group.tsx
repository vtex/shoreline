import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Field, FieldDescription, FieldError } from '../field'
import { Stack } from '../stack'
import { useId } from '@vtex/shoreline-utils'
import { Label } from '../label'

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

export interface CheckboxGroupProps extends ComponentPropsWithoutRef<'div'> {
  error?: boolean
  description?: ReactNode
  errorText?: ReactNode
  label: ReactNode
  horizontal?: boolean
}
