import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

interface FieldContextProps {
  id: string
  error: boolean
}

export const FieldContext = createContext<FieldContextProps | null>(null)

export function useFieldContext() {
  const ctx = useContext(FieldContext)

  invariant(ctx, 'Field composites should be used under the Field context.')

  return ctx
}
