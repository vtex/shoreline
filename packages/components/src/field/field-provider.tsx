import React from 'react'
import type { Store } from '@vtex/shoreline-utils'

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
  /**
   * Field store
   */
  store: Store<FieldContextType>
  /**
   * Children to be rendered within the provider
   */
  children?: React.ReactNode
}
