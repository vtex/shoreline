import { ResponsiveValue } from '@vtex/admin-core'
import React from 'react'
import invariant from 'tiny-invariant'

const ColumnsContext = React.createContext<{
  spacing: ResponsiveValue<number>
} | null>(null)

export function useColumnsContext() {
  const context = React.useContext(ColumnsContext)

  invariant(context, 'You must use Columns composites inside Columns context!')

  return context
}

const { Provider } = ColumnsContext

export { Provider as ColumnsProvider }
