import { createContext, useContext } from 'react'

interface PageHeaderContextType {
  onPopNavigation?: () => void
}

export const PageHeaderContext = createContext<PageHeaderContextType | null>(
  null
)

export function usePageHeaderContext() {
  const context = useContext(PageHeaderContext)

  if (!context) {
    throw new Error('You must call PageHader composites inside of it')
  }

  return context
}
