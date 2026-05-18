import { createContext, useContext } from 'react'

interface CanvasState {
  toolCallId: string | null
  component: string | null
  args: unknown
  result: unknown
  status: string
  open: boolean
}

export interface AIContextValue {
  threadId: string | null
  setThreadId: (id: string | null) => void
  canvas: CanvasState
  openCanvas: (state: Omit<CanvasState, 'open'>) => void
  closeCanvas: () => void
}

const DEFAULT_CANVAS: CanvasState = {
  toolCallId: null,
  component: null,
  args: undefined,
  result: undefined,
  status: 'idle',
  open: false,
}

export const AIContext = createContext<AIContextValue | null>(null)

export function useAIContext(): AIContextValue {
  const context = useContext(AIContext)

  if (!context) {
    throw new Error('useAIContext must be used within an <AIProvider>')
  }

  return context
}

export { DEFAULT_CANVAS }
export type { CanvasState }
