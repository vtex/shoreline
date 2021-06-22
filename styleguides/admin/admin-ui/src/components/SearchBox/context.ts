import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import { ComboboxState } from './hooks/useComboboxState'

export const StateContext = createContext<ComboboxState<any> | null>(null)

export function useStateContext() {
  const context = useContext(StateContext)
  invariant(context, 'state not found')
  return context
}
