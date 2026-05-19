import { createContext, useContext } from 'react'

import type { AIThreadError } from '../../types/public'
import type { AIRuntime } from '../../types/runtime'

interface CanvasState {
  toolCallId: string | null
  component: string | null
  args: unknown
  result: unknown
  status: string
  open: boolean
}

/** Public AI provider context. */
export interface AIContextValue {
  runtime: AIRuntime
  threadId: string | null
  canvas: CanvasState
  openCanvas: (state: Omit<CanvasState, 'open'>) => void
  closeCanvas: () => void
}

/** @internal Used by hooks to update persistence thread id. */
export interface AIContextValueInternal extends AIContextValue {
  setThreadId: (id: string | null) => void
  isOpeningThread: boolean
  error: AIThreadError | null
}

const DEFAULT_CANVAS: CanvasState = {
  toolCallId: null,
  component: null,
  args: undefined,
  result: undefined,
  status: 'idle',
  open: false,
}

export const AIContext = createContext<AIContextValueInternal | null>(null)

export function useAIContextInternal(): AIContextValueInternal {
  const context = useContext(AIContext)

  if (!context) {
    throw new Error('useAIContext must be used within an <AIProvider>')
  }

  return context
}

/**
 * Access AI provider state (runtime, thread id, canvas).
 *
 * @status experimental
 */
export function useAIContext(): AIContextValue {
  const { runtime, threadId, canvas, openCanvas, closeCanvas } =
    useAIContextInternal()

  return { runtime, threadId, canvas, openCanvas, closeCanvas }
}

export { DEFAULT_CANVAS }
export type { CanvasState }
