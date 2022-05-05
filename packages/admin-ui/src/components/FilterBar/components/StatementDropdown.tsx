import React from 'react'
import type { UseSelectStateChange } from 'downshift'
import { get } from '@vtex/admin-ui-util'

import { Box } from '../../../box'
import type { DropdownProps } from '../../Dropdown'
import { Dropdown, useDropdownState } from '../../Dropdown'

/**
 * FilterBar statement dropdown
 *
 * @example
 * <StatementDropdown
 *   label={label}
 *   selectedItem={selectedItem}
 *   handleItemChange={(item) => {}}
 *   items={items}
 * />
 */
export function StatementDropdown<T>(props: StatementDropdownProps<T>) {
  const dropdownProps = useStatementDropdown(props)

  return <Dropdown {...dropdownProps} />
}

export function useStatementDropdown<T>(props: StatementDropdownProps<T>) {
  const {
    csx,
    variant = 'neutralTertiary',
    items,
    selectedItem,
    handleItemChange,
    ...restProps
  } = props

  const state = useDropdownState({
    items,
    selectedItem,
    onSelectedItemChange: handleItemChange,
  })

  const renderItem = (item: T | null) => {
    if (typeof item !== 'object') return item

    return (
      <Box
        csx={{
          textAlign: 'start',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {get(item as any, 'label')}
      </Box>
    )
  }

  return {
    variant,
    renderItem,
    csx: {
      div: {
        width: '100%',
        div: {
          justifyContent: 'space-between',
        },
      },
      minWidth: 150,
      maxWidth: 150,
      ...csx,
    },
    state,
    items,
    ...restProps,
  }
}

export interface StatementDropdownProps<T>
  extends Omit<DropdownProps<T>, 'state'> {
  /**
   * Render function that is called everytime the current selected item changes
   */
  handleItemChange: (item: UseSelectStateChange<T>) => void
  /**
   * Dropdown initial selected item
   */
  selectedItem?: T
}
