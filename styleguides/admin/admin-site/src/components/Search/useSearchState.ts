import { useState, ChangeEvent, useRef } from 'react'
import { debounce } from 'lodash'

export function useSearchState() {
  const [searchValue, setSearchValue] = useState('')
  const [current, setFilterString] = useState('')

  const debounceFilter = useRef(
    debounce((nextValue) => setFilterString(nextValue), 50)
  ).current

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target

    setSearchValue(nextValue)
    debounceFilter(nextValue)
  }

  return {
    searchState: { value: searchValue, onChange: handleChange },
    current,
  }
}
