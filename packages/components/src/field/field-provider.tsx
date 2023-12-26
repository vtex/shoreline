import React from 'react'
import type { Store } from '@vtex/shoreline-store'

import type { FieldContextType } from './field-context'
import { FieldContext } from './field-context'

/**
 * Field provider
 */
export function FieldProvider(props: FieldProviderProps) {
  const { children, store } = props

  return <FieldContext.Provider value={store}>{children}</FieldContext.Provider>
}

export interface FieldProviderProps {
  store: Store<FieldContextType>
  children?: React.ReactNode
}
