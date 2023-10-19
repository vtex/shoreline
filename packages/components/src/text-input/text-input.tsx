import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const { className, prefix, suffix, error, disabled, ...inputProps } = props

    return (
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
}
