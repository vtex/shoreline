import { Store } from '@vtex/shoreline-utils'
import { createContext, useContext } from 'react'

export const FieldContext = createContext<Store<FieldContextType>>(
  new Store({
    id: '',
    error: false,
  })
)

export function useFieldContext() {
  const context = useContext(FieldContext)

  return context
}

export interface FieldContextType {
  id: string
  error: boolean
}
