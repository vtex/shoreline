import type { StreamStatus } from '../../types/public'

/**
 * One snapshot received from the transport during a run. `snapshot` is a
 * copy of the snapshot as the transport yielded it, with its parts, status
 * and `debug` data. Its shape is not interpreted, so the panel keeps working
 * when the parts change.
 *
 * @status experimental
 * @example
 * const step: AIStreamDebugStep = {
 *   index: 1,
 *   at: '2026-01-01T00:00:00.000Z',
 *   status: 'streaming',
 *   snapshot: { parts: [{ type: 'text', text: 'Hi' }], status: 'streaming' },
 * }
 */
export interface AIStreamDebugStep {
  /** Position of the step in the run, starting at 1. */
  index: number
  /** ISO date of the moment the snapshot arrived. */
  at: string
  /** Status sent with the snapshot. */
  status: StreamStatus | undefined
  /** Copy of the snapshot exactly as the transport yielded it. */
  snapshot: unknown
}

/**
 * Everything recorded for one model run.
 *
 * @status experimental
 * @example
 * const { runs } = useAIStreamDebug()
 * const last: AIStreamDebugRun | undefined = runs[0]
 */
export interface AIStreamDebugRun {
  /** Id of the assistant message created by the run. */
  runId: string
  /** Thread id when the run started. */
  threadId: string | null
  /** Id of the user message that started the run. */
  userMessageId: string
  /** ISO date of the moment the run started. */
  startedAt: string
  /**
   * ISO date of the moment the run ended. Not set while it runs.
   * @default undefined
   */
  endedAt?: string
  /** `submitted` before the first snapshot, `streaming` while it runs, then the final status. */
  status: StreamStatus
  /**
   * Error message when the run failed.
   * @default undefined
   */
  error?: string
  /** Snapshots received, oldest first. The oldest are dropped past the limit. */
  steps: AIStreamDebugStep[]
}

/**
 * Value returned by {@link useAIStreamDebug}.
 *
 * @status experimental
 * @example
 * const { enabled, runs, clear } = useAIStreamDebug()
 */
export interface AIStreamDebugState {
  /** True when the nearest `AIProvider` has `debugStream` on. */
  enabled: boolean
  /** Recorded runs, newest first. */
  runs: AIStreamDebugRun[]
  /** Removes every recorded run. */
  clear: () => void
}
