import React from 'react'
import invariant from 'tiny-invariant'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'

const PopoverContext = React.createContext<{
  isScrollableLayout: boolean
  setIsScrollableLayout: (newVal: boolean) => void
  state: UseFilterStateReturn<any> | UseFilterMultipleReturn<any>
} | null>(null)

export function usePopoverContext() {
  const context = React.useContext(PopoverContext)

  invariant(context, 'You must use Popover context!')

  return context
}

const { Provider } = PopoverContext

export { Provider as PopoverProvider }
