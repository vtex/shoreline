import React from 'react'
import { Search, SearchProps } from '../../Search'

export function TableSearch(props: SearchProps) {
  const { height = 'small', ...searchProps } = props

  return <Search height={height} {...searchProps} />
}
