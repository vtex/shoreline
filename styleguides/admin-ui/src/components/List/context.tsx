import React from 'react'
import invariant from 'tiny-invariant'

import { Density } from './index'

const ListContext = React.createContext<{
  density: Density
} | null>(null)

export function useListContext() {
  const context = React.useContext(ListContext)

  invariant(context, 'You must use List composites inside List context!')

  return context
}

const { Provider } = ListContext

export { Provider as ListProvider }
