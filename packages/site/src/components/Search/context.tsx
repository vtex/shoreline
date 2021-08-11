import { useContext, createContext } from 'react'
import type { SearchFormState } from '@vtex/admin-ui'

const SearchContext = createContext<SearchFormState | null>(null)

export function useSearchContext() {
  const ctx = useContext(SearchContext)

  if (!ctx) {
    throw Error('Called search form outside of context')
  }

  return ctx
}

const { Provider: SearchProvider } = SearchContext

export { SearchProvider }
