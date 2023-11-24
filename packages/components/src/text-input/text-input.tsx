import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { Field, FieldLabel, FieldMessage } from '../field'
import { useId } from '@vtex/shoreline-utils'
import './text-input.css'

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
      optional,
      id: defaultId,
      ...inputProps
    } = props

    const id = useId(defaultId)

    return (
      <Field data-sl-text-input className={className}>
        <FieldLabel htmlFor={id} optional={optional}>
          {label}
        </FieldLabel>
        <div
          data-sl-text-input-container
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
            aria-required={optional}
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
  label: ReactNode
  errorText?: string
  helpText?: string
  optional?: boolean
}
