import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { AIThreadError } from '../../types/public'
import type { AIRuntime } from '../../types/runtime'
import type { AIThreadListState } from './use-thread-list-state'

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

/** @internal Used by the hooks to change the thread. */
export interface AIContextValueInternal extends AIContextValue {
  /**
   * Stops the run and opens the thread `id`: clears the messages and loads
   * them with `threads.load`. Does nothing more when `id` is already open.
   */
  openThread: (id: string) => void
  /** Stops the run and opens a new, empty thread. Returns its id. */
  startThread: () => string
  isOpeningThread: boolean
  error: AIThreadError | null
  /** Error of the last run, or `null` when it did not fail. */
  runError: AIThreadError | null
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

  invariant(context, 'useAIContext must be used within an <AIProvider>')

  return context
}

export const AIThreadListContext = createContext<AIThreadListState | null>(null)

export function useAIThreadListContext(): AIThreadListState {
  const context = useContext(AIThreadListContext)

  invariant(context, 'useAIThreadList must be used within an <AIProvider>')

  return context
}

/**
 * Access AI provider state (runtime, thread id, canvas).
 *
 * @status experimental
 * @example
 * const { threadId, canvas, closeCanvas } = useAIContext()
 */
export function useAIContext(): AIContextValue {
  const { runtime, threadId, canvas, openCanvas, closeCanvas } =
    useAIContextInternal()

  return { runtime, threadId, canvas, openCanvas, closeCanvas }
}

export { DEFAULT_CANVAS }
export type { CanvasState }
