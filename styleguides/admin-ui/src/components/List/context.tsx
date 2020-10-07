import React from 'react'
import invariant from 'tiny-invariant'

import { ListDensity } from './index'

const ListContext = React.createContext<{
  density: ListDensity
} | null>(null)

export function useListContext() {
  const context = React.useContext(ListContext)

  invariant(context, 'You must use List composites inside List context!')

  return context
}

const { Provider } = ListContext

export { Provider as ListProvider }
