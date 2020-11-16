import React, { PropsWithChildren, createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

export function createSystemProvider<T>(system: T) {
  const SystemContext = createContext(system)

  return {
    SystemProvider(props: PropsWithChildren<{}>) {
      const { children } = props

      return (
        <SystemContext.Provider value={system}>
          {children}
        </SystemContext.Provider>
      )
    },
    useSystem() {
      const context = useContext(SystemContext)

      invariant(context, 'Do not use it outside of SystemContext')

      return context
    },
  }
}
