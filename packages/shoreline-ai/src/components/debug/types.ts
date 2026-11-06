import type { AIMessagePart, StreamStatus } from '../../types/public'

/**
 * One part that changed between two snapshots of a run.
 *
 * @status experimental
 * @example
 * const change: AIStreamDebugChange = {
 *   partIndex: 1,
 *   type: 'text',
 *   kind: 'updated',
 *   delta: ' world',
 * }
 */
export interface AIStreamDebugChange {
  /** Position of the part in the snapshot. */
  partIndex: number
  /** Type of the part. */
  type: AIMessagePart['type']
  /** `added` for a new part, `updated` for a part that changed. */
  kind: 'added' | 'updated'
  /**
   * Text added to a text or reasoning part. Not set when the text did not
   * grow at the end.
   * @default undefined
   */
  delta?: string
}

/**
 * One snapshot received from the transport during a run. It stores what
 * changed since the previous snapshot, not the whole snapshot.
 *
 * @status experimental
 * @example
 * const step: AIStreamDebugStep = {
 *   index: 1,
 *   at: '2026-01-01T00:00:00.000Z',
 *   status: 'streaming',
 *   changes: [{ partIndex: 0, type: 'text', kind: 'added', delta: 'Hi' }],
 * }
 */
export interface AIStreamDebugStep {
  /** Position of the step in the run, starting at 1. */
  index: number
  /** ISO date of the moment the snapshot arrived. */
  at: string
  /** Status sent with the snapshot. */
  status: StreamStatus | undefined
  /** Parts that changed. Empty when the snapshot repeats the previous one. */
  changes: AIStreamDebugChange[]
  /**
   * Data the transport attached to the snapshot in `debug`.
   * @default undefined
   */
  debug?: unknown
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
  /** Parts at the end of the run, in stream order. Empty while it runs. */
  finalParts: AIMessagePart[]
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
