import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { CompositeStateReturn } from '../Aria'

const ItemContext = createContext<{
  id: string
  state: CompositeStateReturn
  selected: boolean
} | null>(null)

const { Provider } = ItemContext

export { Provider as ItemProvider }

export function useItemContext() {
  const ctx = useContext(ItemContext)

  invariant(
    ctx,
    'You are trying to use a Sidebar.Item composite outside of context. Check the render method of your Sidebar.Item'
  )

  return ctx
}

export enum ArrowKeys {
  Right = 'ArrowRight',
  Left = 'ArrowLeft',
}
