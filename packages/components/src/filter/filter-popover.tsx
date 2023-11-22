import React, { forwardRef } from 'react'

import type { PopoverProps } from '../popover'
import { Popover } from '../popover'
import { Content } from '../content'
import { Stack } from '../stack'
import { FilterClear } from './filter-clear'
import { FilterApply } from './filter-apply'
import { Button } from '../button'
import { Combobox } from '../combobox'
import { useSearchable } from './use-searchable'
import { createMessageHook } from '../locale'
import { messages } from './messages'
import './filter-popover.css'

const useMessage = createMessageHook(messages)

/**
 * Filter popover box
 * @example
 * <FilterProvider>
 *  <FilterPopover>
 *   ...
 *  </FilterPopover>
 * </FilterProvider>
 */
export const FilterPopover = forwardRef<HTMLDivElement, FilterPopoverProps>(
  function FilterPopover(props, ref) {
    const { children, messages, ...otherProps } = props

    const searchable = useSearchable()
    const getMessage = useMessage(messages)

    return (
      <Popover data-sl-filter-popover ref={ref} {...otherProps}>
        <Content>
          <Stack fluid>
            {searchable && (
              <Combobox
                data-sl-filter-popover-combobox
                autoSelect
                placeholder="Search..."
              />
            )}
            {children}
            <footer data-sl-filter-popover-footer>
              <FilterClear asChild>
                <Button>{getMessage('clear')}</Button>
              </FilterClear>
              <FilterApply asChild>
                <Button variant="primary">{getMessage('apply')}</Button>
              </FilterApply>
            </footer>
          </Stack>
        </Content>
      </Popover>
    )
  }
)

export interface FilterPopoverProps extends PopoverProps {
  messages?: {
    apply: string
    clear: string
  }
}
