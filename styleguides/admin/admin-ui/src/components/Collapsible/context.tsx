import React, { useContext, createContext, ReactNode } from 'react'
import { DisclosureProps } from 'reakit'
import invariant from 'tiny-invariant'

interface CollapsibleContextProps extends DisclosureProps {
  isRoot: boolean
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
  children?: ReactNode
}

const TreeContext = createContext<TreeContextProps | null>(null)

export function useTree() {
  const isRoot = !useContext(TreeContext)

  if (!isRoot) {
    return { isRoot: false }
  }

  return { isRoot }
}

export function TreeProvider(props: TreeContextProps) {
  const { children, ...restProps } = props

  return (
    <TreeContext.Provider value={{ ...restProps }}>
      {children}
    </TreeContext.Provider>
  )
}
