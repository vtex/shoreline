import React from 'react'
import { get, useSystem } from '@vtex/admin-core'

import { Dropdown, DropdownProps } from '../../Dropdown'
import { Box } from '@vtex/admin-primitives'

export function FilterDropdown<T>(props: DropdownProps<T>) {
  const dropdownProps = useFilterDropdown(props)

  return <Dropdown {...dropdownProps} />
}

export function useFilterDropdown<T>(props: DropdownProps<T>) {
  const { csx, variant = 'adaptative-dark', ...restProps } = props
  const { stylesOf } = useSystem()

  const renderItem = (item: T | null) => {
    if (typeof item !== 'object') return item

    return (
      <Box csx={{ themeKey: 'components.filterBar.filter-dropdown-label' }}>
        {get(item, 'label')}
      </Box>
    )
  }

  return {
    variant,
    renderItem,
    csx: {
      ...stylesOf('components.filterBar.filter-dropdown'),
      ...csx,
    },
    ...restProps,
  }
}
