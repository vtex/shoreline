import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Field, FieldLabel, FieldMessage } from '../field'
import { useId } from '@vtex/shoreline-utils'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const {
      className,
      prefix,
      suffix,
      error,
      disabled,
      label,
      helpText,
      errorText,
      id: defaultId,
      ...inputProps
    } = props

    const id = useId(defaultId)

    return (
      <Field data-sl-text-input-field>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <div
          className={className}
          data-sl-text-input
          data-disabled={disabled}
          data-error={error}
        >
          {prefix && (
            <div data-sl-text-input-term data-type="prefix">
              {prefix}
            </div>
          )}
          <input
            data-sl-input
            id={id}
            ref={ref}
            disabled={disabled}
            {...inputProps}
          />
          {suffix && (
            <div data-sl-text-input-term data-type="suffix">
              {suffix}
            </div>
          )}
        </div>
        <FieldMessage helpText={helpText} errorText={errorText} error={error} />
      </Field>
    )
  }
)

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'prefix'> {
  /**
  Whether there is an error
  @default false
  */
  error?: boolean
  /**
  Whether is disabled or not
  @default false
  */
  disabled?: boolean
  /**
  Node added before input space
  */
  prefix?: React.ReactNode
  /**
  Node added before input space
  */
  suffix?: React.ReactNode
  label: string
  errorText?: string
  helpText?: string
}
