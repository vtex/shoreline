import type { ComponentProps } from 'react'
import React, { forwardRef } from 'react'
import { useControlledState } from '@vtex/shoreline-utils'
import { useStore } from '@vtex/shoreline-store'

import { Slot } from '../slot'
import { useFieldContext } from '../field'

/**
 * Text Input component
 * @example
 * <Input />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
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
        <Slot name="term" data-type="prefix">
          {prefix}
        </Slot>
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
        <Slot name="term" data-type="suffix">
          {suffix}
        </Slot>
      )}
    </div>
  )
})

export interface InputProps
  extends Omit<ComponentProps<'input'>, 'prefix' | 'onChange'> {
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
