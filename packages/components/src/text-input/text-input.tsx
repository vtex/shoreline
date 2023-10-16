import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { textInputStyle } from './text-input.css'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const { className, prefix, suffix, error, disabled, ...inputProps } = props

    return (
      <div
        className={cx(textInputStyle, className)}
        data-sl-text-input
        data-disabled={disabled}
        data-error={error}
      >
        {prefix && (
          <div data-sl-text-input-term data-type="prefix">
            {prefix}
          </div>
        )}
        <input data-sl-input ref={ref} disabled={disabled} {...inputProps} />
        {suffix && (
          <div data-sl-text-input-term data-type="suffix">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

export interface TextInputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string
  error?: boolean
  disabled?: boolean
  prefix?: any
  suffix?: any
}
