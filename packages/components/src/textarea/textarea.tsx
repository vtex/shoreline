import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/shoreline-utils'

import { Field, FieldLabel, FieldMessage } from '../field'

export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
      error = false,
      disabled = false,
      className = '',
      children,
      value = '',
      maxLength,
      label,
      helpText = '',
      errorText = '',
      id: baseId,
      ...htmlProps
    } = props

    const charCount = String(value).length

    const id = baseId ?? useId()

    return (
      <Field ref={ref} className={className}>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <div data-sl-textarea-container>
          <textarea
            id={id}
            data-sl-textarea
            data-error={error}
            data-disabled={disabled}
            disabled={disabled}
            maxLength={maxLength}
            aria-invalid={error}
            {...htmlProps}
          />
          {maxLength && (
            <p data-sl-textarea-char-counter>
              {charCount} / {maxLength}
            </p>
          )}
        </div>
        <FieldMessage error={error} errorText={errorText} helpText={helpText} />
      </Field>
    )
  }
)

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  error?: boolean
  label?: ReactNode
  helpText?: ReactNode
  errorText?: ReactNode
}
