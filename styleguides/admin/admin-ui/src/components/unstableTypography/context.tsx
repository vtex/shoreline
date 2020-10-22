import React, { createContext, PropsWithChildren, useContext } from 'react'

type HeadingContextType = {
  level: number
}

const HeadingContext = createContext<HeadingContextType>({ level: 1 })

export function useHeadingLevel() {
  const context = useContext(HeadingContext)
  const level = context?.level ?? 1

  return level
}

export function HeadingLevelProvider(
  props: PropsWithChildren<HeadingContextType>
) {
  const { level, children } = props

  return (
    <HeadingContext.Provider value={{ level }}>
      {children}
    </HeadingContext.Provider>
  )
}
