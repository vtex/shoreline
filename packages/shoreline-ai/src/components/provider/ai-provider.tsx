/**
 * <AIProvider> — root provider for @vtex/shoreline-ai.
 */

import {
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { AssistantRuntimeProvider } from '@assistant-ui/react'

import { loadThreadMessages } from '../../runtime/load-thread-messages'
import type { AIMessage } from '../../types/public'
import type { AIRuntime } from '../../types/runtime'
import { AIStreamDebugProvider } from '../debug/stream-debug-context'
import { AIContext, DEFAULT_CANVAS, type CanvasState } from './ai-context'

/**
 * @status experimental
 * @example
 * ```tsx
 * const built = useMemo(() => createRuntimeBuilder().transport(transport).build(), [transport])
 * const runtime = useRuntime(built)
 *
 * <AIProvider runtime={runtime}>
 *   <Thread />
 * </AIProvider>
 * ```
 */
export interface AIProviderOptions {
  /** Runtime from `useRuntime(built)`. */
  runtime: AIRuntime
  /**
   * Active conversation id. Pass for controlled mode (you own state).
   * Omit for uncontrolled mode (provider keeps the id internally).
   */
  threadId?: string | null
  /** Called when the active thread id changes. */
  onThreadChange?: (id: string | null) => void
  /** Returns persisted messages when a conversation opens. */
  onThreadOpen?: (threadId: string) => Promise<AIMessage[]>
  /** Enable stream debug callbacks. */
  debugStream?: boolean
  children?: ReactNode
}

export type AIProviderProps = AIProviderOptions

const AIProviderInner = forwardRef<HTMLDivElement, AIProviderProps>(
  function AIProviderInner(props, ref) {
    const {
      runtime,
      children,
      threadId: threadIdProp,
      onThreadChange,
      onThreadOpen,
    } = props

    const isControlled = threadIdProp !== undefined
    const [uncontrolledThreadId, setUncontrolledThreadId] = useState<
      string | null
    >(threadIdProp ?? null)
    const threadId = isControlled
      ? (threadIdProp ?? null)
      : uncontrolledThreadId

    const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS)
    const prevControlledThreadId = useRef<string | null | undefined>(undefined)

    const setThreadId = useCallback(
      (id: string | null) => {
        if (!isControlled) {
          setUncontrolledThreadId(id)
        }

        onThreadChange?.(id)
      },
      [isControlled, onThreadChange]
    )

    useEffect(() => {
      if (!isControlled) return

      const prev = prevControlledThreadId.current

      if (prev === threadIdProp) return

      prevControlledThreadId.current = threadIdProp

      if (prev != null && threadIdProp != null) {
        runtime.thread.reset([])
      } else if (threadIdProp === null) {
        runtime.thread.reset([])
      }

      if (!threadIdProp || !onThreadOpen) return

      let cancelled = false
      const id = threadIdProp

      onThreadOpen(id).then((messages) => {
        if (cancelled || id !== threadIdProp) return
        if (messages.length > 0) loadThreadMessages(runtime, messages)
      })

      return () => {
        cancelled = true
      }
    }, [isControlled, threadIdProp, runtime, onThreadOpen])

    const handleOpenCanvas = useCallback((state: Omit<CanvasState, 'open'>) => {
      setCanvas({ ...state, open: true })
    }, [])

    const handleCloseCanvas = useCallback(() => {
      setCanvas(DEFAULT_CANVAS)
    }, [])

    const contextValue = useMemo(
      () => ({
        runtime,
        threadId,
        setThreadId,
        canvas,
        openCanvas: handleOpenCanvas,
        closeCanvas: handleCloseCanvas,
      }),
      [
        runtime,
        threadId,
        setThreadId,
        canvas,
        handleOpenCanvas,
        handleCloseCanvas,
      ]
    )

    return (
      <AIContext.Provider value={contextValue}>
        <AssistantRuntimeProvider runtime={runtime}>
          <div ref={ref} data-sl-ai-provider="">
            {children}
          </div>
        </AssistantRuntimeProvider>
      </AIContext.Provider>
    )
  }
)

export const AIProvider = forwardRef<HTMLDivElement, AIProviderProps>(
  function AIProvider(props, ref) {
    const { debugStream, children, ...rest } = props

    if (debugStream) {
      return (
        <AIStreamDebugProvider>
          <AIProviderInner ref={ref} {...rest}>
            {children}
          </AIProviderInner>
        </AIStreamDebugProvider>
      )
    }

    return (
      <AIProviderInner ref={ref} {...rest}>
        {children}
      </AIProviderInner>
    )
  }
)
