import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef, useState } from 'react'
import { Menu } from 'ariakit'
import { cx } from '@vtex/admin-ui-core'

import { PopoverProvider } from './filter-popover-context'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { Flex } from '../flex'
import { FilterStatus } from './filter-status'
import { filterPopoverTheme } from './filter.style'

export const FilterPopover = forwardRef(function FilterPopover(
  props: FilterPopoverProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    children,
    state,
    className = '',
    onRetry = () => {},
    ...htmlProps
  } = props

  const [isScrollableLayout, setIsScrollableLayout] = useState(false)
  const contextState = { isScrollableLayout, setIsScrollableLayout, state }

  const shouldDisplayChildren = !(
    state.status === 'loading' || state.status === 'empty'
  )

  return (
    <Menu
      state={state.menu}
      ref={ref}
      className={cx(filterPopoverTheme, className)}
      {...htmlProps}
    >
      <PopoverProvider value={contextState}>
        <Flex direction="column">
          {shouldDisplayChildren && children}
          <FilterStatus status={state.status} onRetry={onRetry} />
        </Flex>
      </PopoverProvider>
    </Menu>
  )
})

export type FilterPopoverProps = ComponentPropsWithoutRef<'div'> & {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
  onRetry?: () => void
}
