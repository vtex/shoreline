import { useState, useEffect } from 'react'
import { Search } from '@vtex/shoreline'

export default function Example() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
  }

  // Simulate API search with debounce
  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue)
      setIsSearching(false)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchValue])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Search
        value={searchValue}
        onChange={handleChange}
        onClear={handleClear}
        loading={isSearching}
      />
      {debouncedValue && !isSearching && (
        <div>Search results for: {debouncedValue}</div>
      )}
    </div>
  )
}
