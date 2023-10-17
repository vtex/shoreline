import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { fieldMessageStyle } from './field.css'
import { Stack } from '../stack'
import { useFieldContext } from './field-context'

export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(
  function FieldMessage(props, ref) {
    const { className, helpText = '', errorText = '', ...restProps } = props

    const { error } = useFieldContext()
    const hasError = error && errorText

    return (
      <div
        ref={ref}
        data-sl-field-message
        className={cx(fieldMessageStyle, className)}
        {...restProps}
      >
        <Stack space="$space-1">
          {helpText && (
            <p data-sl-field-message-text className={fieldMessageStyle}>
              {helpText}
            </p>
          )}
          {hasError && (
            <p
              data-error
              data-sl-field-message-text
              className={fieldMessageStyle}
            >
              {errorText}
            </p>
          )}
        </Stack>
      </div>
    )
  }
)

export type FieldMessageProps = {
  helpText?: ReactNode
  errorText?: ReactNode
  className?: string
}
