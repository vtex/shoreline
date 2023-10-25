import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef, useId } from 'react'
import { Field, FieldLabel, FieldMessage } from '../field'
import { IconCaretUpDownSmall } from '@vtex/shoreline-icons'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const {
      children,
      value,
      helpText,
      errorText,
      label,
      error = false,
      disabled = false,
      ...otherProps
    } = props

    const id = useId()

    return (
      <Field data-sl-select>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <div data-sl-select-input-container>
          <select
            ref={ref}
            defaultValue=""
            value={value}
            disabled={disabled}
            data-sl-select-input
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

          <IconCaretUpDownSmall data-sl-select-icon />
        </div>
        <FieldMessage error={error} errorText={errorText} helpText={helpText} />
      </Field>
    )
  }
)

export type SelectProps = ComponentPropsWithoutRef<'select'> & {
  error?: boolean
  label?: ReactNode
  errorText?: ReactNode
  helpText?: ReactNode
  disabled?: boolean
}
