import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Flex } from '../flex'

export const FieldMessage = forwardRef<HTMLDivElement, FieldMessageProps>(
  function FieldMessage(props, ref) {
    const { error = false, helpText = '', errorText = '', ...restProps } = props

    const hasError = error && errorText

    return (
      <div ref={ref} data-sl-field-message {...restProps}>
        <Flex direction="column">
          {helpText && <p data-sl-field-message-text>{helpText}</p>}
          {hasError && (
            <p data-sl-field-message-text role="alert">
              {errorText}
            </p>
          )}
        </Flex>
      </div>
    )
  }
)

export interface FieldMessageProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Help text message
   */
  helpText?: ReactNode
  /**
   * Error text message
   */
  errorText?: ReactNode
  /**
   * Whether the field contains an error or not
   * @default false
   */
  error?: boolean
}
