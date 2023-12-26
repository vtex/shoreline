import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { useControlledState } from '@vtex/shoreline-utils'

import './textarea.css'
import { useFieldContext } from '../field'
import { useStore } from '@vtex/shoreline-store'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
      error: defaultError,
      disabled = false,
      resizable = true,
      className = '',
      id: defaultId,
      children,
      value,
      defaultValue,
      onChange,
      maxLength,
      optional,
      ...htmlProps
    } = props

    const store = useFieldContext()
    const { id: contextId, error: contextError } = useStore(store, (s) => s)

    const id = defaultId || contextId
    const error = defaultError || contextError

    const [_value, _setValue] = useControlledState(
      value,
      defaultValue || '',
      onChange
    )

    return (
      <div data-sl-textarea className={className}>
        <textarea
          ref={ref}
          id={id}
          data-sl-textarea-input
          data-error={error}
          data-disabled={disabled}
          data-resizable={resizable}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={error}
          value={_value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            _setValue(e.target.value)
          }
          {...htmlProps}
        />
      </div>
    )
  }
)

export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<'textarea'>, 'onChange'> {
  error?: boolean
  optional?: boolean
  resizable?: boolean
  /**
   * Callback for value change
   */
  onChange?: React.Dispatch<React.SetStateAction<any>>
}
