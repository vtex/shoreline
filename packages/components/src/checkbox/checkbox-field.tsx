import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import type { AriaCheckboxProps } from './use-aria-checkbox'
import { Field, FieldLabel, FieldMessage } from '../field'
import { Checkbox } from './checkbox'
import { useId } from '@vtex/shoreline-utils'

/**
 * Checkbox field with label and help message
 * @example
 * <CheckboxField>Label</CheckboxField>
 */
export const CheckboxField = forwardRef<HTMLDivElement, CheckboxFieldProps>(
  function CheckboxField(props, forwardedRef) {
    const {
      error,
      helpText,
      errorText,
      children,
      id: defaultId,
      disabled,
      ...ariaProps
    } = props

    const id = useId(defaultId)

    return (
      <Field variant="control" data-sl-checkbox-field>
        <FieldLabel disabled={disabled} htmlFor={id}>
          {children}
        </FieldLabel>
        <Checkbox
          id={id}
          disabled={disabled}
          ref={forwardedRef}
          {...ariaProps}
        />

        <FieldMessage error={error} errorText={errorText} helpText={helpText} />
      </Field>
    )
  }
)

export interface CheckboxFieldProps extends AriaCheckboxProps {
  /**
   * Whether the field contains an error or not
   * @default false
   */
  error?: boolean
  /**
   * Error message
   */
  errorText?: ReactNode
  /**
   * Help message
   */
  helpText?: ReactNode
}
