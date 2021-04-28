import React from 'react'
import { get, useSystem } from '@vtex/admin-core'

import { Dropdown, DropdownProps } from '../../Dropdown'
import { Box } from '@vtex/admin-primitives'

export function StatementDropdown<T>(props: DropdownProps<T>) {
  const dropdownProps = useStatementDropdown(props)

  return <Dropdown {...dropdownProps} />
}

export function useStatementDropdown<T>(props: DropdownProps<T>) {
  const { csx, variant = 'adaptative-dark', ...restProps } = props
  const { stylesOf } = useSystem()

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
    ...restProps,
  }
}
