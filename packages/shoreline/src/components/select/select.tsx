import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { IconCaretUpDownSmall } from '../../icons'
import { useControlledState, useStore } from '@vtex/shoreline-utils'

import { useFieldContext } from '../field'

import {
  SelectProvider,
  useSelectStore,
  type SelectProviderOptions,
} from './select-provider'
import { SelectPopover } from './select-popover'
import { SelectTrigger } from './select-trigger'
import { SelectArrow } from '@ariakit/react'

import { messages } from './messages'
import { createMessageHook } from '../locale'
import { SelectValue } from './select-value'
import { isEmpty } from './select-utils'

const useMessage = createMessageHook(messages)

/**
 * Select opens a dropdown with between five and seven values for users to choose one. Use Radios for less items or a Combobox for more items.
 * @status stable
 * @example
 * <Select>
 *   <SelectItem value="item-1">Item 1</SelectItem>
 *   <SelectItem value="item-2">Item 2</SelectItem>
 *   <SelectItem value="item-3">Item 3</SelectItem>
 * </Select>
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(props, ref) {
    const {
      children,
      value,
      className,
      id: defaultId,
      disabled = false,
      error: defaultError,
      defaultValue,
      setValue,
      messages,
      ...otherProps
    } = props

    const [_value, _setValue] = useControlledState(
      value,
      defaultValue || '',
      setValue
    )

    const store = useFieldContext()
    const select = useSelectStore({
      value: _value,
      setValue: _setValue,
    })

    const { id: contextId, error: contextError } = useStore(store, (s) => s)

    const getMessage = useMessage(messages)

    const error = defaultError || contextError
    const id = defaultId || contextId

    return (
      <div data-sl-select>
        <SelectProvider store={select}>
          <SelectTrigger
            data-sl-select-button
            ref={ref}
            disabled={disabled}
            data-error={error}
            data-selected={!isEmpty(_value)}
            data-disabled={disabled}
            id={id}
            {...otherProps}
          >
            <SelectValue placeholder={getMessage('placeholder')} />
            <SelectArrow render={<IconCaretUpDownSmall />} />
          </SelectTrigger>
          <SelectPopover
            sameWidth
            unmountOnHide
            hideOnInteractOutside
            gutter={4}
          >
            {children}
          </SelectPopover>
        </SelectProvider>
      </div>
    )
  }
)

export interface SelectOptions extends SelectProviderOptions {
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
   * Select messages
   */
  messages?: {
    placeholder: string
  }
}

export type SelectProps = SelectOptions & ComponentPropsWithoutRef<'button'>
