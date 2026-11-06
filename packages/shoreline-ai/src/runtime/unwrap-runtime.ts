/**
 * Converts between the public runtime type and the runtime used inside the
 * package. Both functions return the same object, so a handle linked with
 * `bindRunObserverHandle` can still be found.
 */

import type { AssistantRuntime } from '@assistant-ui/react'

import type { AIRuntime } from '../types/runtime'

/**
 * Types an internal runtime as the public `AIRuntime`.
 *
 * @status experimental
 * @example
 * const runtime = wrapRuntime(localRuntime)
 */
export function wrapRuntime(engine: AssistantRuntime): AIRuntime {
  return engine as unknown as AIRuntime
}

/**
 * Gives back the internal runtime behind a public `AIRuntime`.
 *
 * @status experimental
 * @example
 * unwrapRuntime(runtime).thread.reset([])
 */
export function unwrapRuntime(runtime: AIRuntime): AssistantRuntime {
  return runtime as unknown as AssistantRuntime
}
