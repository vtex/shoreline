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

import type { RunObserver } from '../../runtime/run-observer'
import { getRuntimeCore } from '../../runtime/runtime-core'
import { loadThreadMessages } from '../../runtime/load-thread-messages'
import type { AIThreadError } from '../../types/public'
import type { AIRuntime } from '../../types/runtime'
import type { AIThreadAdapter } from '../../types/threads'
import { generateThreadId } from '../../utils/generate-id'
import { toAIThreadError } from '../../utils/to-ai-thread-error'
import {
  AIStreamDebugScope,
  DEFAULT_DEBUG_MAX_RUNS,
  DEFAULT_DEBUG_MAX_STEPS,
  useStreamDebugObserver,
} from '../debug/stream-debug-context'
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
 * <AIProvider runtime={runtime}>
 *   <Thread />
 * </AIProvider>
 * ```
 */
export interface AIProviderOptions {
  /** Runtime from `useRuntime(built)`. */
  runtime: AIRuntime
  /**
   * Active thread id. Pass it to control the thread yourself and update it in
   * `onThreadChange`. Omit it and the provider keeps the id.
   * @default undefined
   */
  threadId?: string | null
  /**
   * Called when the active thread id changes.
   * @default undefined
   */
  onThreadChange?: (id: string | null) => void
  /**
   * Thread operations backed by your server: `list`, `load` and `archive`.
   * `load` returns the saved messages when a thread opens. Keep the object
   * stable between renders (for example with `useMemo`).
   * @default undefined
   */
  threads?: AIThreadAdapter
  /**
   * Called once when a run fails. Use it for side effects such as a toast or
   * a log. Runs that the user cancels do not call it.
   * @default undefined
   */
  onRunError?: (error: AIThreadError) => void
  /**
   * Records every run so `useAIStreamDebug` and `AIStreamDebugPanel` can show
   * it. Turn it on only while debugging: when it is off nothing is recorded.
   * You can turn it on or off at any time: the thread is kept, and turning it
   * off drops the recorded runs. The recorded snapshots are stored as they
   * arrive, so the transport must not change a snapshot after it yields it.
   * @default false
   */
  debugStream?: boolean
  /**
   * Number of runs kept when `debugStream` is on. The oldest runs are
   * dropped first.
   * @default 20
   */
  debugMaxRuns?: number
  /**
   * Number of steps kept per run when `debugStream` is on. The oldest steps
   * are dropped first.
   * @default 1000
   */
  debugMaxSteps?: number
  /**
   * Your chat UI.
   * @default undefined
   */
  children?: ReactNode
}

/**
 * Props of `AIProvider`: `AIProviderOptions` plus the ref.
 *
 * @status experimental
 * @example
 * const props: AIProviderProps = { runtime, children: null }
 */
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

    const debugObserver = useStreamDebugObserver()
    const threadList = useThreadListState(threads)
    const threadsRef = useRef(threads)
    threadsRef.current = threads

    const isControlled = threadIdProp !== undefined
    const [uncontrolledThreadId, setUncontrolledThreadId] = useState<
      string | null
    >(null)
    const threadId = isControlled
      ? (threadIdProp ?? null)
      : uncontrolledThreadId

    const [canvas, setCanvas] = useState<CanvasState>(DEFAULT_CANVAS)
    const [isOpeningThread, setIsOpeningThread] = useState(false)
    const [error, setError] = useState<AIThreadError | null>(null)
    const [runError, setRunError] = useState<AIThreadError | null>(null)
    const onRunErrorRef = useRef(onRunError)
    onRunErrorRef.current = onRunError
    const onThreadChangeRef = useRef(onThreadChange)
    onThreadChangeRef.current = onThreadChange

    // The id of the active thread, also when the parent has not passed back
    // an id the provider sent it yet. A run reads it before the next render.
    const activeThreadId = useRef<string | null>(threadIdProp ?? null)

    // Ids sent with `onThreadChange` that the parent has not passed back as
    // `threadId` yet, oldest first. Used only when the id is controlled.
    const sentThreadIds = useRef<string[]>([])

    // The last `threadId` prop the controlled effect handled.
    const handledThreadIdProp = useRef<string | null | undefined>(undefined)

    // The open request that is still current. A result of an older one is
    // ignored.
    const openRequest = useRef<object | null>(null)

    // False after unmount, so a late `threads.load` result cannot write into
    // a runtime that outlives the provider. It is a flag and not a reset of
    // `openRequest`: under StrictMode the effects run twice and the controlled
    // effect below does not request the thread again.
    const isMounted = useRef(false)

    useEffect(() => {
      isMounted.current = true

      return () => {
        isMounted.current = false
      }
    }, [])

    // Clears the open state and, when `id` is set and there is a
    // `threads.load`, loads the messages of that thread.
    const openThreadMessages = useCallback(
      (id: string | null) => {
        const load = threadsRef.current?.load

        setError(null)

        if (!id || !load) {
          openRequest.current = null
          setIsOpeningThread(false)
          return
        }

        const request = {}

        openRequest.current = request
        setIsOpeningThread(true)

        load(id)
          .then((messages) => {
            if (openRequest.current !== request || !isMounted.current) return
            if (messages.length > 0) loadThreadMessages(runtime, messages)
          })
          .catch((cause) => {
            if (openRequest.current !== request || !isMounted.current) return
            setError(toAIThreadError('thread_open', cause))
          })
          .finally(() => {
            if (openRequest.current !== request || !isMounted.current) return
            openRequest.current = null
            setIsOpeningThread(false)
          })
      },
      [runtime]
    )

    // The one way the thread changes: it clears the run error and the
    // messages, then loads the new thread when `load` is set.
    const transition = useCallback(
      (next: string | null, options: { load: boolean }) => {
        activeThreadId.current = next
        setRunError(null)
        getRuntimeCore(runtime).engine.thread.reset([])
        openThreadMessages(options.load ? next : null)
      },
      [runtime, openThreadMessages]
    )

    // Makes `id` the thread id of the provider and tells the parent. A
    // controlled parent passes it back as `threadId`, and the controlled
    // effect then knows the change is already done.
    const sendThreadId = useCallback(
      (id: string) => {
        activeThreadId.current = id

        if (isControlled) {
          sentThreadIds.current.push(id)
        } else {
          setUncontrolledThreadId(id)
        }

        onThreadChangeRef.current?.(id)
      },
      [isControlled]
    )

    const openThread = useCallback(
      (id: string) => {
        getRuntimeCore(runtime).engine.thread.cancelRun()

        if (id === activeThreadId.current) return

        transition(id, { load: true })
        sendThreadId(id)
      },
      [runtime, transition, sendThreadId]
    )

    const startThread = useCallback(() => {
      const id = generateThreadId()

      getRuntimeCore(runtime).engine.thread.cancelRun()
      transition(id, { load: false })
      sendThreadId(id)

      return id
    }, [runtime, transition, sendThreadId])

    // A run that starts with no thread open names the current thread: the
    // messages, the run and its error stay.
    useEffect(() => {
      const { threadIdResolver } = getRuntimeCore(runtime)
      const resolve = () => {
        if (activeThreadId.current) return activeThreadId.current

        const id = generateThreadId()

        sendThreadId(id)

        return id
      }

      threadIdResolver.current = resolve

      return () => {
        if (threadIdResolver.current === resolve) {
          threadIdResolver.current = null
        }
      }
    }, [runtime, sendThreadId])

    useEffect(() => {
      if (!isControlled) return

      const next = threadIdProp ?? null
      const previous = handledThreadIdProp.current

      if (previous === next) return

      handledThreadIdProp.current = next

      const sent = next === null ? -1 : sentThreadIds.current.indexOf(next)

      if (sent !== -1) {
        sentThreadIds.current.splice(0, sent + 1)
        return
      }

      // The first id opens the thread of a fresh provider: there is nothing
      // to clear yet.
      if (previous === undefined) {
        activeThreadId.current = next
        openThreadMessages(next)
        return
      }

      transition(next, { load: true })
    }, [isControlled, threadIdProp, openThreadMessages, transition])

    useEffect(() => {
      const { observers } = getRuntimeCore(runtime)
      const observer: RunObserver = {
        onRunStart: (run) => {
          setRunError(null)
          debugObserver?.onRunStart(run)
        },
        onSnapshot: (runId, snapshot) => {
          debugObserver?.onSnapshot(runId, snapshot)
        },
        onRunEnd: (runId, end) => {
          debugObserver?.onRunEnd(runId, end)

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

      observers.add(observer)

      return () => {
        observers.delete(observer)
      }
    }, [runtime, debugObserver])

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
        openThread,
        startThread,
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
        openThread,
        startThread,
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
          <AssistantRuntimeProvider runtime={getRuntimeCore(runtime).engine}>
            <div ref={ref} data-sl-ai-provider="">
              {children}
            </div>
          </AssistantRuntimeProvider>
        </AIThreadListContext.Provider>
      </AIContext.Provider>
    )
  }
)

/**
 * Wraps your chat UI. It connects the runtime to the hooks and the components,
 * and keeps the thread id, the canvas and the run error. Providers do not share
 * state, and a hook reads the nearest provider above it.
 *
 * @status experimental
 * @example
 * <AIProvider runtime={runtime} threads={threads}>
 *   <AIThread />
 * </AIProvider>
 */
export const AIProvider = forwardRef<HTMLDivElement, AIProviderProps>(
  function AIProvider(props, ref) {
    const {
      debugStream = false,
      debugMaxRuns = DEFAULT_DEBUG_MAX_RUNS,
      debugMaxSteps = DEFAULT_DEBUG_MAX_STEPS,
      children,
      ...rest
    } = props

    return (
      <AIStreamDebugScope
        enabled={debugStream}
        maxRuns={debugMaxRuns}
        maxSteps={debugMaxSteps}
      >
        <AIProviderInner ref={ref} {...rest}>
          {children}
        </AIProviderInner>
      </AIStreamDebugScope>
    )
  }
)
