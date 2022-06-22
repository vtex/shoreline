import { createContext, useContext } from 'react'
import type { PageHeaderOptions } from './page-header'

type PageHeaderContextType = PageHeaderOptions

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
