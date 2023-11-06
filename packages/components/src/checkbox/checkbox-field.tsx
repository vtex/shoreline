import type { ReactElement } from 'react'
import React, { forwardRef } from 'react'

import type { AriaCheckboxProps } from './use-aria-checkbox'
import { Field, FieldLabel, FieldMessage } from '../field'
import { Checkbox } from './checkbox'

/**
 * Checkbox field with label and help message
 * @example
 * <Checkbox label="label" />
 */
export const CheckboxField = forwardRef<HTMLDivElement, CheckboxFieldProps>(
  function CheckboxField(props, forwardedRef) {
    const { error, message, label, ...ariaProps } = props

    return (
      <Field variant="control" data-sl-checkbox-field>
        <FieldLabel>{label}</FieldLabel>
        <Checkbox error={error} ref={forwardedRef} {...ariaProps} />

        <FieldMessage error={error} errorText={message} />
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
  message?: string
  label: string | ReactElement
}
