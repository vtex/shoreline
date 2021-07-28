import React, { createContext, PropsWithChildren, useContext } from 'react'

export interface GroupProps {
  /**
   * If is grouped or not
   * @default false
   */
  grouped?: boolean
}

const GroupContext = createContext<GroupProps>({
  grouped: false,
})

/**
 * Provide grouped context
 */
export function Group(props: PropsWithChildren<GroupProps>) {
  const { children, grouped = true } = props

  return (
    <GroupContext.Provider value={{ grouped }}>
      {children}
    </GroupContext.Provider>
  )
}

/**
 * Use to create a size-aware component
 */
export function useGroup() {
  const { grouped } = useContext(GroupContext)

  return {
    grouped,
  }
}
