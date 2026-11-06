import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import type { RunObserver } from '../../runtime/run-observer'
import type { AIMessagePart } from '../../types/public'
import { addRun, addStep, diffSnapshot, endRun } from './record-run'
import type { AIStreamDebugRun, AIStreamDebugState } from './types'

/** Number of runs kept when `debugMaxRuns` is not set. */
export const DEFAULT_DEBUG_MAX_RUNS = 20

/** Number of steps kept per run when `debugMaxSteps` is not set. */
export const DEFAULT_DEBUG_MAX_STEPS = 1000

interface AIStreamDebugContextValue {
  runs: AIStreamDebugRun[]
  clear: () => void
  observer: RunObserver
}

/**
 * `null` when debug is off. Each `AIProvider` sets it, so a nested provider
 * never sees the runs of an outer one.
 */
const AIStreamDebugContext = createContext<AIStreamDebugContextValue | null>(
  null
)

const DISABLED: AIStreamDebugState = {
  enabled: false,
  runs: [],
  clear: () => {},
}

interface OpenRun {
  parts: AIMessagePart[]
  count: number
}

/**
 * Records the runs of the provider it wraps. Rendered by `AIProvider` only
 * when `debugStream` is on.
 */
export function AIStreamDebugRecorder(props: {
  maxRuns?: number
  maxSteps?: number
  children: ReactNode
}) {
  const {
    maxRuns = DEFAULT_DEBUG_MAX_RUNS,
    maxSteps = DEFAULT_DEBUG_MAX_STEPS,
    children,
  } = props
  const [runs, setRuns] = useState<AIStreamDebugRun[]>([])
  const limits = useRef({ maxRuns, maxSteps })
  limits.current = { maxRuns, maxSteps }

  // Parts of the last snapshot and step count of each run still going.
  const openRuns = useRef(new Map<string, OpenRun>())

  const clear = useCallback(() => {
    openRuns.current.clear()
    setRuns([])
  }, [])

  const observer = useMemo<RunObserver>(
    () => ({
      onRunStart: (run) => {
        try {
          openRuns.current.set(run.runId, { parts: [], count: 0 })
          setRuns((prev) =>
            addRun(
              prev,
              { ...run, status: 'submitted', steps: [], finalParts: [] },
              limits.current.maxRuns
            )
          )
        } catch {
          // Debug must never break a run.
        }
      },
      onSnapshot: (runId, snapshot) => {
        try {
          const open = openRuns.current.get(runId)

          if (!open) return

          const changes = diffSnapshot(open.parts, snapshot.parts)

          open.parts = snapshot.parts
          open.count += 1

          const step = {
            index: open.count,
            at: new Date().toISOString(),
            status: snapshot.status,
            changes,
            ...(snapshot.debug !== undefined && { debug: snapshot.debug }),
          }

          setRuns((prev) => addStep(prev, runId, step, limits.current.maxSteps))
        } catch {
          // Debug must never break a run.
        }
      },
      onRunEnd: (runId, end) => {
        try {
          openRuns.current.delete(runId)
          setRuns((prev) =>
            endRun(prev, runId, {
              status: end.status,
              error: end.error,
              finalParts: end.finalParts,
              endedAt: new Date().toISOString(),
            })
          )
        } catch {
          // Debug must never break a run.
        }
      },
    }),
    []
  )

  const value = useMemo(
    () => ({ runs, clear, observer }),
    [runs, clear, observer]
  )

  return (
    <AIStreamDebugContext.Provider value={value}>
      {children}
    </AIStreamDebugContext.Provider>
  )
}

/**
 * Hides the runs of an outer provider. Rendered by `AIProvider` when
 * `debugStream` is off.
 */
export function AIStreamDebugOff(props: { children: ReactNode }) {
  return (
    <AIStreamDebugContext.Provider value={null}>
      {props.children}
    </AIStreamDebugContext.Provider>
  )
}

/** Observer of the nearest recorder, or `null` when debug is off. */
export function useStreamDebugObserver(): RunObserver | null {
  return useContext(AIStreamDebugContext)?.observer ?? null
}

/**
 * Returns the runs recorded by the nearest `AIProvider`. Recording happens
 * only when that provider has `debugStream` on; otherwise `enabled` is
 * false and `runs` is empty.
 *
 * @status experimental
 * @example
 * function RunCount() {
 *   const { enabled, runs, clear } = useAIStreamDebug()
 *
 *   if (!enabled) return null
 *
 *   return <button onClick={clear}>{runs.length} runs</button>
 * }
 */
export function useAIStreamDebug(): AIStreamDebugState {
  const context = useContext(AIStreamDebugContext)

  return useMemo(
    () =>
      context
        ? { enabled: true, runs: context.runs, clear: context.clear }
        : DISABLED,
    [context]
  )
}
