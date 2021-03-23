import { createContext, useContext } from 'react'
import { CompositeStateReturn } from '../Aria'

const ItemContext = createContext<{
  id: string
  state: CompositeStateReturn
  selected: boolean
} | null>(null)

const { Provider } = ItemContext

export { Provider as ItemProvider }

export function useItemContext() {
  const ctx = useContext(ItemContext)

  if (!ctx) {
    throw new Error('outside of item')
  }

  return ctx
}

export enum ArrowKeys {
  Right = 'ArrowRight',
  Left = 'ArrowLeft',
}
