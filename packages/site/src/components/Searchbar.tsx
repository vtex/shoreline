import React, { useState, useRef } from 'react'
import type { StyleProp } from '@vtex/admin-ui'
import {
  VisuallyHidden,
  Box,
  Label,
  AbstractInput,
  useSystem,
} from '@vtex/admin-ui'
import { IconMagnifyingGlass } from '@vtex/phosphor-icons'
import { debounce } from 'lodash'

interface SearchbarProps {
  id: string
  state: {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
  styleOverrides?: StyleProp
  placeholder?: string
}

export function Searchbar(props: SearchbarProps) {
  const { state, id, styleOverrides = {}, placeholder } = props
  const { cn } = useSystem()

  return (
    <form className={cn(styleOverrides)}>
      <Box role="search">
        <VisuallyHidden>
          <Label htmlFor={id}>Icon search</Label>
        </VisuallyHidden>
        <AbstractInput
          id={id}
          {...state}
          icon={<IconMagnifyingGlass />}
          placeholder={placeholder}
        />
        <VisuallyHidden>
          <input type="button" value="Search" />
        </VisuallyHidden>
      </Box>
    </form>
  )
}

export function useSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [current, setFilterString] = useState('')

  const debounceFilter = useRef(
    debounce((nextValue) => setFilterString(nextValue), 50)
  ).current

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target

    setSearchValue(nextValue)
    debounceFilter(nextValue)
  }

  return {
    searchState: { value: searchValue, onChange: handleChange },
    current,
  }
}
