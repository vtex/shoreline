import React from 'react'
import { UseSelectStateChange } from 'downshift'
import { get } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'

import { Dropdown, DropdownProps, useDropdownState } from '../../Dropdown'

export function StatementDropdown<T>(props: StatementDropdownProps<T>) {
  const dropdownProps = useStatementDropdown(props)

  return <Dropdown {...dropdownProps} />
}

export function useStatementDropdown<T>(props: StatementDropdownProps<T>) {
  const {
    csx,
    variant = 'adaptative-dark',
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
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {get(item, 'label')}
      </Box>
    )
  }

  return {
    variant,
    renderItem,
    csx: {
      bg: 'light.primary',
      border: 'default',
      color: 'dark.secondary',
      div: {
        justifyContent: 'space-between',
      },
      minWidth: 150,
      ...csx,
    },
    state,
    items,
    ...restProps,
  }
}

export interface StatementDropdownProps<T>
  extends Omit<DropdownProps<T>, 'state'> {
  handleItemChange: (item: UseSelectStateChange<T>) => void
  selectedItem: T
}
