import type { ComponentPropsWithoutRef, ReactElement } from 'react'
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
  className?: string
  error?: boolean
  helpText?: string
  errorText?: string
  label: string | ReactElement
  direction?: 'row' | 'column'
}
