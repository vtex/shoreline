import React, { useState } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import type { MenuProps } from 'ariakit'
import { Menu } from 'ariakit'
import { PopoverProvider } from './filter-popover-context'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { Flex } from '../flex'
import { FilterStatus } from './filter-status'

export const FilterPopover = createComponent<typeof Menu, FilterPopoverOptions>(
  (props) => {
    const { children, state, onRetry = () => {}, ...restProps } = props

    const [isScrollableLayout, setIsScrollableLayout] = useState(false)
    const contextState = { isScrollableLayout, setIsScrollableLayout, state }

    const shouldDisplayChildren = !(
      state.status === 'loading' || state.status === 'empty'
    )

    return useElement(Menu, {
      baseStyle: {
        text: '$body',
        boxShadow: '$overlay.bottom',
        border: '$neutral',
        borderRadius: 'default',
        bg: '$primary',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 256,
        zIndex: 999,
        ...focusVisible('neutral'),
      },
      children: (
        <PopoverProvider value={contextState}>
          <Flex direction="column">
            {shouldDisplayChildren && children}
            <FilterStatus status={state.status} onRetry={onRetry} />
          </Flex>
        </PopoverProvider>
      ),
      state: state.menu,
      ...restProps,
    })
  }
)

type FilterPopoverOptions = Omit<MenuProps, 'state'> & {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
  onRetry?: () => void
}
