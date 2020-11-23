import React, { useState, useRef } from 'react'
import {
  VisuallyHidden,
  Box,
  Label,
  unstableInput as Input,
  SxStyleProp,
  cn,
} from '@vtex/admin-ui'
import { IconSearch } from '@vtex/admin-ui-icons'
import { debounce } from 'lodash'

interface SearchbarProps {
  id: string
  state: {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
  styleOverrides?: SxStyleProp
}

export function Searchbar(props: SearchbarProps) {
  const { state, id, styleOverrides = {} } = props

  return (
    <form className={cn(styleOverrides)}>
      <Box role="search">
        <VisuallyHidden>
          <Label htmlFor={id}>Icon search</Label>
        </VisuallyHidden>
        <Input
          id={id}
          {...state}
          icon={<IconSearch />}
          placeholder="Search for icon"
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

  const decounceFilter = useRef(
    debounce((nextValue) => setFilterString(nextValue), 50)
  ).current

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target

    setSearchValue(nextValue)
    decounceFilter(nextValue)
  }

  return {
    searchState: { value: searchValue, onChange: handleChange },
    current,
  }
}
