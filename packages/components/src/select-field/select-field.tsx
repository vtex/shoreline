import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Field, FieldLabel, FieldMessage } from '../field'
import { IconCaretUpDownSmall } from '@vtex/shoreline-icons'
import { useId } from '@vtex/shoreline-utils'

/**
 * Select fields allow merchants to choose a single option from a list
 * that includes between five and seven values.
 *
 * @example
 *
 * <SelectField
 *   label="Label"
 *   helpText="Help text"
 *   errorText="Error text"
 * >
 *   <option>option</option>
 *   <option>option</option>
 *   <option>option</option>
 * </SelectField>
 */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(props, ref) {
    const {
      children,
      value,
      helpText,
      errorText,
      label,
      error = false,
      disabled = false,
      optional = false,
      className,
      id: defaultId,
      ...otherProps
    } = props

    const id = useId(defaultId)

    return (
      <Field data-sl-select-field className={className}>
        {label && (
          <FieldLabel htmlFor={id} optional={optional}>
            {label}
          </FieldLabel>
        )}
        <div data-sl-select-field-input-container>
          <select
            ref={ref}
            defaultValue=""
            value={value}
            disabled={disabled}
            data-sl-select-field-input
            data-error={error}
            data-selected={!!value}
            data-disabled={disabled}
            aria-invalid={error}
            id={id}
            {...otherProps}
          >
            <option value="" disabled>
              Select&hellip;
            </option>
            {children}
          </select>

          <IconCaretUpDownSmall data-sl-select-field-icon />
        </div>
        <FieldMessage error={error} errorText={errorText} helpText={helpText} />
      </Field>
    )
  }
)

export interface SelectFieldProps extends ComponentPropsWithoutRef<'select'> {
  error?: boolean
  label?: ReactNode
  errorText?: ReactNode
  helpText?: ReactNode
  disabled?: boolean
  optional?: boolean
}
