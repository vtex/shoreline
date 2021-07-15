import React from 'react'
import { Search as BaseSearch, SearchProps } from '../../Search'

export function Search(props: SearchProps) {
  const {  containerCsx, ...searchProps } = props

  return (
    <BaseSearch
      containerCsx={{ width: '25%', minWidth: '12.25rem', ...containerCsx }}
      {...searchProps}
    />
  )
}
