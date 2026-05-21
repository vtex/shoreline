import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type AIMessagePartPlacement = 'cot' | 'message'

const AIMessagePartPlacementContext =
  createContext<AIMessagePartPlacement>('message')

export function AIMessagePartPlacementProvider(props: {
  placement: AIMessagePartPlacement
  children: ReactNode
}) {
  return (
    <AIMessagePartPlacementContext.Provider value={props.placement}>
      {props.children}
    </AIMessagePartPlacementContext.Provider>
  )
}

export function useAIMessagePartPlacement(): AIMessagePartPlacement {
  return useContext(AIMessagePartPlacementContext)
}
