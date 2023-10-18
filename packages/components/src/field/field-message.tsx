import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Stack } from '../stack'

export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(
  function FieldMessage(props, ref) {
    const {
      className,
      error = false,
      helpText = '',
      errorText = '',
      ...restProps
    } = props

    const hasError = error && errorText

    return (
      <div ref={ref} data-sl-field-message className={className} {...restProps}>
        <Stack space="$space-1">
          {helpText && <p data-sl-field-message-text>{helpText}</p>}
          {hasError && (
            <p data-sl-field-message-text role="alert">
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
  error?: boolean
}
