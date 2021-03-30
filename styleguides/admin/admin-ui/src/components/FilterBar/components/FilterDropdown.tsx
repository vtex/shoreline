import React from 'react'
import { useSystem } from '@vtex/admin-core'

import { Dropdown, DropdownProps } from '../../Dropdown'

export function FilterDropdown<T>(props: DropdownProps<T>) {
  const { csx, ...restProps } = props
  const { stylesOf } = useSystem()

  return (
    <Dropdown
      {...restProps}
      variant="adaptative-dark"
      csx={{
        ...stylesOf('components.filterBar.dropdown'),
        ...csx,
      }}
    />
  )
}
