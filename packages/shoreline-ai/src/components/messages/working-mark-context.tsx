import { createContext, useContext, type ReactNode } from 'react'

const WorkingMarkContext = createContext<ReactNode | undefined>(undefined)

/**
 * Provides the glyph that every reasoning mark below uses when it has no
 * children of its own. Internal; not part of the public API.
 */
export function WorkingMarkProvider(props: {
  value?: ReactNode
  children: ReactNode
}) {
  return (
    <WorkingMarkContext.Provider value={props.value}>
      {props.children}
    </WorkingMarkContext.Provider>
  )
}

/** The glyph from the closest `WorkingMarkProvider`, if any. */
export function useWorkingMark(): ReactNode | undefined {
  return useContext(WorkingMarkContext)
}
