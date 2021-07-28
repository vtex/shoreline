import React from 'react'

import type { SearchProps } from '../../Search'
import { Search as BaseSearch } from '../../Search'

export function Search(props: SearchProps) {
  const { containerCsx, ...searchProps } = props

  return (
    <BaseSearch
      containerCsx={{ width: '25%', minWidth: '12.25rem', ...containerCsx }}
      {...searchProps}
    />
  )
}
