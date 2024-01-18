import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { IconCaretUpDownSmall } from '@vtex/shoreline-icons'
import { useStore, useControlledState } from '@vtex/shoreline-utils'

import { useFieldContext } from '../field'

/**
 * Select fields allow merchants to choose a single option from a list
 * that includes between five and seven values.
 *
 * @example
 *
 * <Select
 *   label="Label"
 *   helpText="Help text"
 *   errorText="Error text"
 * >
 *   <option>option</option>
 *   <option>option</option>
 *   <option>option</option>
 * </Select>
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const {
      children,
      value,
      className,
      id: defaultId,
      disabled = false,
      error: defaultError,
      defaultValue,
      onChange,
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
      <div data-sl-select-input-container className={className}>
        <select
          ref={ref}
          value={_value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            _setValue(e.target.value)
          }
          disabled={disabled}
          data-sl-select-input
          data-error={error}
          data-selected={!!value}
          data-disabled={disabled}
          id={id}
          {...otherProps}
        >
          <option value="" disabled>
            Select&hellip;
          </option>
          {children}
        </select>

        <IconCaretUpDownSmall data-sl-select-icon />
      </div>
    )
  }
)

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<'select'>, 'onChange'> {
  /**
   * Whether is in error state
   */
  error?: boolean
  /**
   * Whether is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Callback for value change
   */
  onChange?: React.Dispatch<React.SetStateAction<any>>
}
