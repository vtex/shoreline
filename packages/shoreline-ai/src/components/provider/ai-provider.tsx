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

import {
  type RunObserver,
  getRunObserverHandle,
} from '../../runtime/run-observer'
import { loadThreadMessages } from '../../runtime/load-thread-messages'
import type { AIThreadError } from '../../types/public'
import type { AIRuntime } from '../../types/runtime'
import { unwrapRuntime } from '../../runtime/unwrap-runtime'
import type { AIThreadAdapter } from '../../types/threads'
import { toAIThreadError } from '../../utils/to-ai-thread-error'
import { AIStreamDebugProvider } from '../debug/stream-debug-context'
import {
  AIContext,
  AIThreadListContext,
  DEFAULT_CANVAS,
  type CanvasState,
} from './ai-context'
import { useThreadListState } from './use-thread-list-state'

/**
 * @status experimental
 * @example
 * ```tsx
 * const built = useMemo(() => createRuntimeBuilder().transport(transport).build(), [transport])
 * const runtime = useRuntime(built)
 *
 * <AIProvider runtime={unwrapRuntime(runtime)}>
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
  /**
   * Thread operations backed by your server. Its `load` method returns the
   * saved messages when a thread opens. Keep the object stable between renders.
   * @default undefined
   */
  threads?: AIThreadAdapter
  /**
   * Called once when a run fails. Use it for side effects such as a toast or
   * a log. Runs that the user cancels do not call it.
   * @default undefined
   */
  onRunError?: (error: AIThreadError) => void
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
      threads,
      onRunError,
    } = props

    const threadList = useThreadListState(threads)
    const threadsRef = useRef(threads)
    threadsRef.current = threads

    const isControlled = threadIdProp !== undefined
    const [uncontrolledThreadId, setUncontrolledThreadId] = useState<
      string | null
    >(threadIdProp ?? null)
    const threadId = isControlled
      ? (threadIdProp ?? null)
      : uncontrolledThreadId

    const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS)
    const [isOpeningThread, setIsOpeningThread] = useState(false)
    const [error, setError] = useState<AIThreadError | null>(null)
    const [runError, setRunError] = useState<AIThreadError | null>(null)
    const onRunErrorRef = useRef(onRunError)
    onRunErrorRef.current = onRunError
    const prevControlledThreadId = useRef<string | null | undefined>(undefined)

    const setThreadId = useCallback(
      (id: string | null) => {
        setRunError(null)

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
      setRunError(null)

      if (prev != null && threadIdProp != null) {
        unwrapRuntime(runtime).thread.reset([])
      } else if (threadIdProp === null) {
        unwrapRuntime(runtime).thread.reset([])
      }

      const load = threadsRef.current?.load

      if (!threadIdProp || !load) {
        setIsOpeningThread(false)
        setError(null)
        return
      }

      let cancelled = false
      const id = threadIdProp

      setIsOpeningThread(true)
      setError(null)

      load(id)
        .then((messages) => {
          if (cancelled || id !== threadIdProp) return
          if (messages.length > 0) loadThreadMessages(runtime, messages)
        })
        .catch((cause) => {
          if (cancelled || id !== threadIdProp) return
          setError(toAIThreadError('thread_open', cause))
        })
        .finally(() => {
          if (!cancelled && id === threadIdProp) {
            setIsOpeningThread(false)
          }
        })

      return () => {
        cancelled = true
      }
    }, [isControlled, threadIdProp, runtime])

    useEffect(() => {
      const handle = getRunObserverHandle(runtime)

      if (!handle) return

      const observer: RunObserver = {
        onRunStart: () => setRunError(null),
        onSnapshot: () => {},
        onRunEnd: (_runId, end) => {
          if (end.status !== 'error' || end.cancelled) return

          const failure: AIThreadError = {
            type: 'run',
            message: end.error ?? 'The run failed.',
          }

          setRunError(failure)

          try {
            onRunErrorRef.current?.(failure)
          } catch {
            // A failing user callback must not break the run.
          }
        },
      }

      handle.current = observer

      return () => {
        if (handle.current === observer) handle.current = null
      }
    }, [runtime])

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
        isOpeningThread,
        error,
        runError,
        canvas,
        openCanvas: handleOpenCanvas,
        closeCanvas: handleCloseCanvas,
      }),
      [
        runtime,
        threadId,
        setThreadId,
        isOpeningThread,
        error,
        runError,
        canvas,
        handleOpenCanvas,
        handleCloseCanvas,
      ]
    )

    return (
      <AIContext.Provider value={contextValue}>
        <AIThreadListContext.Provider value={threadList}>
          <AssistantRuntimeProvider runtime={unwrapRuntime(runtime)}>
            <div ref={ref} data-sl-ai-provider="">
              {children}
            </div>
          </AssistantRuntimeProvider>
        </AIThreadListContext.Provider>
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
