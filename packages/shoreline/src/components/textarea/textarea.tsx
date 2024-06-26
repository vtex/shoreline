import type { ComponentPropsWithoutRef } from 'react'
import type React from 'react'
import { forwardRef } from 'react'
import { useControlledState, useStore } from '@vtex/shoreline-utils'

import { useFieldContext } from '../field'

/**
 * Text Area is a field for text values that can take up more than one line in a form, such as descriptions or comments.
 * @status stable
 * @example
 * <Textarea label="Label" maxLength={120} optional resizable={false} />
 */
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

export interface TextareaOptions {
  /**
   * Whether is in error state
   */
  error?: boolean
  /**
   * Whether the textarea is optional or not
   */
  optional?: boolean
  /**
   * Whether the textarea is resizable or not
   * @default true
   */
  resizable?: boolean
  /**
   * Callback for value change
   */
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

export type TextareaProps = TextareaOptions &
  Omit<ComponentPropsWithoutRef<'textarea'>, 'onChange'>
