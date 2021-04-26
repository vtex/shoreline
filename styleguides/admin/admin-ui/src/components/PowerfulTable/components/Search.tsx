import React from 'react'
import { Search, SearchProps } from '../../Search'

export function TableSearch(props: SearchProps) {
  const { height = 'small', ...searchProps } = props

  return (
    <Search
      wrappingFormCSX={{ width: '25%', minWidth: '22.25rem' }}
      height={height}
      {...searchProps}
    />
  )
}
