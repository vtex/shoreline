import React, { useContext, createContext } from 'react'
import type { DisclosureProps } from 'reakit'
import invariant from 'tiny-invariant'

interface CollapsibleContextProps extends DisclosureProps {
  variant: { container: string; header: string; content: string }
}

const CollapsibleContext = createContext<CollapsibleContextProps | null>(null)

export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)

  invariant(
    context,
    `Do not use Collapsible's composites outside of Collapsible context`
  )

  return context
}

export function CollapsibleProvider({
  children,
  ...restProps
}: CollapsibleContextProps) {
  return (
    <CollapsibleContext.Provider value={{ ...restProps }}>
      {children}
    </CollapsibleContext.Provider>
  )
}

interface TreeContextProps {
  isRoot: boolean
}

const TreeContext = createContext<TreeContextProps>({ isRoot: true })

export function useTree() {
  const { isRoot } = useContext(TreeContext)

  return { isRoot }
}

export function TreeProvider(props: React.PropsWithChildren<TreeContextProps>) {
  const { children, ...restProps } = props

  return (
    <TreeContext.Provider value={{ ...restProps }}>
      {children}
    </TreeContext.Provider>
  )
}
