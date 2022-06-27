import React from 'react'
import invariant from 'tiny-invariant'

const PopoverContext = React.createContext<{
  isScrollableLayout: boolean
  setIsScrollableLayout: (newVal: boolean) => void
} | null>(null)

export function usePopoverContext() {
  const context = React.useContext(PopoverContext)

  invariant(context, 'You must use Popover context!')

  return context
}

const { Provider } = PopoverContext

export { Provider as PopoverProvider }
