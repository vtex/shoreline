import { useState } from 'react'
import { Search } from '@vtex/shoreline'

export default function Example() {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
  }

  return (
    <Search value={searchValue} onChange={handleChange} onClear={handleClear} />
  )
}
