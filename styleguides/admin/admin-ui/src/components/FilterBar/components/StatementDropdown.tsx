import React from 'react'
import { get, useSystem } from '@vtex/admin-core'

import { Dropdown, DropdownProps, useDropdownState } from '../../Dropdown'
import { Box } from '@vtex/admin-primitives'
import { UseSelectStateChange } from 'downshift'

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
  const { stylesOf } = useSystem()

  const state = useDropdownState({
    items,
    selectedItem,
    onSelectedItemChange: handleItemChange,
  })

  const renderItem = (item: T | null) => {
    if (typeof item !== 'object') return item

    return (
      <Box csx={{ themeKey: 'components.filterBar.dropdown-label' }}>
        {get(item, 'label')}
      </Box>
    )
  }

  return {
    variant,
    renderItem,
    csx: {
      ...stylesOf('components.filterBar.dropdown'),
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
