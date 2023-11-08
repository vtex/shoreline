import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Field, FieldLabel, FieldMessage } from '../field'
import { Stack } from '../stack'
import { useId } from '@vtex/shoreline-utils'

export const CheckboxGroup = forwardRef<HTMLInputElement, CheckboxGroupProps>(
  function CheckboxGroup(props, ref) {
    const {
      error,
      helpText,
      errorText,
      label,
      children,
      className,
      direction,
      id: defaultId,
      ...otherProps
    } = props

    const id = useId(defaultId)

    return (
      <Field
        data-sl-checkbox-group
        className={className}
        ref={ref}
        variant="group"
        {...otherProps}
      >
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Stack direction={direction}>{children}</Stack>
        <FieldMessage error={error} helpText={helpText} errorText={errorText} />
      </Field>
    )
  }
)

export interface CheckboxGroupProps extends ComponentPropsWithoutRef<'div'> {
  error?: boolean
  helpText?: ReactNode
  errorText?: ReactNode
  label: ReactNode
  direction?: 'row' | 'column'
}
