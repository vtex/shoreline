/**
 * <AIProvider> — root provider for @vtex/shoreline-ai.
 *
 * Receives a pre-built Assistant runtime (from useRuntime) and wires AIContext.
 */

import {
  type ReactNode,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react'

import {
  AssistantRuntimeProvider,
  type AssistantRuntime,
} from '@assistant-ui/react'

import { AIStreamDebugProvider } from '../debug/stream-debug-context'
import type { BuiltRuntime } from '../../runtime/types'
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
  runtime: AssistantRuntime | BuiltRuntime
  threadId?: string | null
  onThreadChange?: (id: string | null) => void
  debugStream?: boolean
  children?: ReactNode
}

export type AIProviderProps = AIProviderOptions

function isBuiltRuntime(
  value: AssistantRuntime | BuiltRuntime
): value is BuiltRuntime {
  return 'transport' in value && typeof value.transport === 'object'
}

const AIProviderInner = forwardRef<HTMLDivElement, AIProviderProps>(
  function AIProviderInner(props, ref) {
    const {
      runtime,
      children,
      threadId: initialThreadId,
      onThreadChange,
    } = props

    if (isBuiltRuntime(runtime)) {
      throw new Error(
        'AIProvider expects an AssistantRuntime from useRuntime(), not BuiltRuntime. Call useRuntime(built) first.'
      )
    }

    const [threadId, setThreadIdState] = useState<string | null>(
      initialThreadId ?? null
    )
    const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS)

    const setThreadId = useCallback(
      (id: string | null) => {
        setThreadIdState(id)
        onThreadChange?.(id)
      },
      [onThreadChange]
    )

    const handleOpenCanvas = useCallback((state: Omit<CanvasState, 'open'>) => {
      setCanvas({ ...state, open: true })
    }, [])

    const handleCloseCanvas = useCallback(() => {
      setCanvas(DEFAULT_CANVAS)
    }, [])

    const contextValue = useMemo(
      () => ({
        threadId,
        setThreadId,
        canvas,
        openCanvas: handleOpenCanvas,
        closeCanvas: handleCloseCanvas,
      }),
      [threadId, setThreadId, canvas, handleOpenCanvas, handleCloseCanvas]
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
