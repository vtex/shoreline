import React from 'react'

import type { SearchProps } from '../../Search'
import { Search } from '../../Search'

export function TableSearch(props: SearchProps) {
  const { containerCsx, ...searchProps } = props

  return (
    <Search
      containerCsx={{ width: '25%', minWidth: '12.25rem', ...containerCsx }}
      {...searchProps}
    />
  )
}
