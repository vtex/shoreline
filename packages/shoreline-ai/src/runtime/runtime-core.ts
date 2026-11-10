/**
 * The object behind the public `AIRuntime`. Internal.
 */

import type { AssistantRuntime } from '@assistant-ui/react'
import invariant from 'tiny-invariant'

import type { AIRuntime } from '../types/runtime'
import type { AttachmentErrorReason } from './bridge/attachment-bridge'
import type { RunObserver } from './run-observer'

/**
 * State shared by the adapters, the provider and the hooks. It is created
 * before the engine because the adapters that the engine needs read it.
 */
export interface RuntimeChannel {
  /** Every provider that follows the runs of this runtime. */
  readonly observers: Set<RunObserver>
  /**
   * Gives the id of the thread a run belongs to, creating one when no thread
   * is open. Set by the provider that shows the thread; `null` without one.
   */
  readonly threadIdResolver: { current: (() => string) | null }
  /**
   * Why each failed attachment of the composer failed, by attachment id.
   * Written by the attachment adapter, read by the attachment chips.
   */
  readonly attachmentErrors: Map<string, AttachmentErrorReason>
}

/** The runtime returned by `useRuntime`. */
export interface RuntimeCore extends AIRuntime, RuntimeChannel {
  readonly engine: AssistantRuntime
}

export function createRuntimeChannel(): RuntimeChannel {
  return {
    observers: new Set(),
    threadIdResolver: { current: null },
    attachmentErrors: new Map(),
  }
}

export function createRuntimeCore(
  engine: AssistantRuntime,
  channel: RuntimeChannel
): RuntimeCore {
  return { __shorelineRuntime: true, engine, ...channel }
}

function isRuntimeCore(runtime: AIRuntime): runtime is RuntimeCore {
  return 'engine' in runtime && 'observers' in runtime
}

/** Gives the internals of a runtime created by `useRuntime`. */
export function getRuntimeCore(runtime: AIRuntime): RuntimeCore {
  invariant(
    isRuntimeCore(runtime),
    'AIProvider: pass the runtime returned by useRuntime'
  )

  return runtime
}
