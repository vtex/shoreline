import { useContext, createContext } from 'react'

import type { useSearchState } from '.'

const SearchContext = createContext<ReturnType<typeof useSearchState>>({
  current: '',
  searchState: { value: '', onChange: () => null },
})

export function useSearchContext() {
  const ctx = useContext(SearchContext)

  return ctx
}

const { Provider: SearchProvider } = SearchContext

export { SearchProvider }
