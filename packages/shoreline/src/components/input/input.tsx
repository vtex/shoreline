import type { ComponentProps } from 'react'
import type React from 'react'
import { forwardRef } from 'react'
import { useControlledState, useStore } from '@vtex/shoreline-utils'

import { useFieldContext } from '../field'

/**
 * An Input is a field for short text values. It can include masks and character restrictions, such as accepting only numbers.
 * @status stable
 * @example
 * <Input />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      id: defaultId,
      disabled,
      error: defaultError,
      prefix,
      suffix,
      defaultValue,
      value,
      onChange,
      className,
      ...otherProps
    } = props

    const [_value, _setValue] = useControlledState(
      value,
      defaultValue || '',
      onChange
    )

    const store = useFieldContext()
    const { id: contextId, error: contextError } = useStore(store, (s) => s)

    const error = defaultError || contextError
    const id = defaultId || contextId

    return (
      <div
        data-sl-input
        data-disabled={disabled}
        data-error={error}
        className={className}
      >
        {prefix && (
          <div data-sl-input-term data-type="prefix">
            {prefix}
          </div>
        )}
        <input
          data-sl-input-element
          ref={ref}
          value={_value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            _setValue(e.target.value)
          }
          id={id}
          {...otherProps}
        />
        {suffix && (
          <div data-sl-input-term data-type="suffix">
            {suffix}
          </div>
        )}
      </div>
    )
  }
)

export interface InputOptions {
  /**
   * Whether there is an error
   * @default false
   */
  error?: boolean
  /**
   * Whether is disabled or not
   * @default false
   */
  disabled?: boolean
  /**
   * Node added before input space
   */
  prefix?: React.ReactNode
  /**
   * Node added before input space
   */
  suffix?: React.ReactNode
  /**
   * Callback for value change
   */
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

export type InputProps = InputOptions &
  Omit<ComponentProps<'input'>, 'prefix' | 'onChange'>
