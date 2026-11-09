/**
 * Lets other parts of the package follow a model run: when it starts, every
 * snapshot the transport yields, and how it ends.
 */

import type { StreamStatus } from '../types/public'
import type { AIRuntime } from '../types/runtime'
import type { RuntimeSnapshot } from './types'

/**
 * Data sent when a run starts. Used inside the package only.
 *
 * @status experimental
 */
export interface RunStart {
  runId: string
  threadId: string | null
  userMessageId: string
  /** ISO date of the moment the run started. */
  startedAt: string
}

/**
 * Data sent when a run ends. Used inside the package only.
 *
 * @status experimental
 */
export interface RunEnd {
  status: StreamStatus
  /** Error message, set when `status` is `'error'`. */
  error?: string
  /** True when the run was stopped by the user or by a thread switch. */
  cancelled: boolean
}

/**
 * Receives run events. Used inside the package only. Every snapshot from the
 * transport is reported, including the ones that repeat the previous parts.
 *
 * @status experimental
 * @example
 * const observer: RunObserver = {
 *   onRunStart: (run) => console.log('start', run.runId),
 *   onSnapshot: (runId, snapshot) => console.log(runId, snapshot.parts),
 *   onRunEnd: (runId, end) => console.log('end', runId, end.status),
 * }
 */
export interface RunObserver {
  onRunStart(run: RunStart): void
  onSnapshot(runId: string, snapshot: RuntimeSnapshot): void
  onRunEnd(runId: string, end: RunEnd): void
}

/**
 * Holds the observer that is attached at the moment. Used inside the package
 * only. `current` is `null` when nobody is listening.
 *
 * @status experimental
 */
export interface RunObserverHandle {
  current: RunObserver | null
}

const handles = new WeakMap<object, RunObserverHandle>()

/**
 * Creates an empty handle.
 *
 * @status experimental
 * @example
 * const handle = createRunObserverHandle()
 */
export function createRunObserverHandle(): RunObserverHandle {
  return { current: null }
}

/**
 * Links a handle to a runtime so it can be found again with
 * {@link getRunObserverHandle}.
 *
 * @status experimental
 * @example
 * bindRunObserverHandle(runtime, handle)
 */
export function bindRunObserverHandle(
  runtime: AIRuntime,
  handle: RunObserverHandle
): void {
  handles.set(runtime, handle)
}

/**
 * Returns the handle linked to this runtime, if any.
 *
 * @status experimental
 * @example
 * const handle = getRunObserverHandle(runtime)
 */
export function getRunObserverHandle(
  runtime: AIRuntime
): RunObserverHandle | undefined {
  return handles.get(runtime)
}
